import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { ChatRoom } from './entities/chat-room.entity';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostChatMessageDto } from './dto/post-chat-message.dto';
import { ChatGptService } from '../chatgpt/chatgpt.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>,
    @InjectRepository(ChatRoom)
    private readonly chatRoomRepository: Repository<ChatRoom>,
    private readonly chatGptService: ChatGptService,
  ) {}

  // async createChat(createChatData: CreateChatDto): Promise<Chat> {
  //   const newChat = this.chatRepository.create(createChatData);
  //   return await this.chatRepository.save(newChat);
  // }

  /**
   * @summary 채팅방 생성 API Service
   * @param createRoomData
   * @returns
   */
  async createChatRoom(createRoomData: CreateChatRoomDto): Promise<ChatRoom> {
    const room = await this.findOneRoom(
      createRoomData.userId,
      createRoomData.modelId,
    );

    if (room) return room;
    else {
      const newRoom = this.chatRoomRepository.create(createRoomData);
      return await this.chatRoomRepository.save(newRoom);
    }
  }

  async createChatMessage(userId: number, body: PostChatMessageDto) {
    /**
     * (1) ChatRoom 아이디를 가져온다.
     */
    const chatRoom = await this.chatRoomRepository.findOne({
      where: {
        userId,
        modelId: body.modelId,
      },
    });

    if (!chatRoom) {
      throw new BadRequestException('ChatRoom Not Exist');
    }

    // 여기서 이전 내용들을 불러온다
    const beforeMessages = await this.chatRepository.find({
      where: {
        chatRoomId: chatRoom.id,
      },
      order: {
        createdAt: 'ASC',
      },
    });

    const result = await this.chatGptService.createQuestionWithMultiplePrompt(
      this.generateMultiplePrompt(beforeMessages, body.message),
    );

    // 채팅 저장 - 사용자가 보낸것
    const { id: userSendMessageId } = await this.chatRepository.save({
      chatRoomId: chatRoom.id,
      senderId: userId,
      receiverId: body.modelId,
      message: body.message,
    });
    // 채팅 저장 - 모델이 답변한 것
    const { id: modelAnswerMessageId } = await this.chatRepository.save({
      chatRoomId: chatRoom.id,
      senderId: body.modelId,
      receiverId: userId,
      message: result,
    });

    return {
      userSend: {
        id: userSendMessageId,
        message: body.message,
      },
      modelAnswer: {
        id: modelAnswerMessageId,
        message: result,
      },
    };
  }

  async findChat(rooomId: number): Promise<Chat[]> {
    return await this.chatRepository.find({
      where: {
        chatRoomId: rooomId,
      },
      order: {
        updatedAt: 'DESC',
      },
    });
  }

  async findOneRoom(user: number, model: number): Promise<ChatRoom> {
    return await this.chatRoomRepository.findOne({
      where: {
        userId: user,
        modelId: model,
      },
    });
  }

  async findUserRoom(user: number): Promise<ChatRoom[]> {
    return await this.chatRoomRepository.find({
      where: {
        userId: user,
      },
      order: {
        updatedAt: 'DESC',
      },
    });
  }

  async findAllRoom(): Promise<ChatRoom[]> {
    return await this.chatRoomRepository.find();
  }

  generateMultiplePrompt(
    chatList: Chat[],
    message: string,
  ): { role: string; content: string }[] {
    const temp = [];
    for (let i = 0; i < chatList.length; i++) {
      if (chatList[i].id % 2 === 1) {
        temp.push({ role: 'user', content: chatList[i].message });
      } else {
        temp.push({ role: 'assistant', content: chatList[i].message });
      }
    }
    temp.push({ role: 'user', content: message });
    return temp;
  }
}
