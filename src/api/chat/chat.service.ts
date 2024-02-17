import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { ChatRoom } from './entities/chat-room.entity';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>,
    @InjectRepository(ChatRoom)
    private readonly chatRoomRepository: Repository<ChatRoom>,
  ) {}
  async createChat(createChatData: CreateChatDto): Promise<Chat[]> {
    const newChat = await this.chatRepository.create(createChatData);
  }

  async createChatRoom(createRoomData: CreateChatRoomDto): Promise<ChatRoom> {
    const room = await this.findOneRoom(
      createRoomData.userId,
      createRoomData.modelId,
    );
    if (room) return room;
    else {
      const newRoom = await this.chatRoomRepository.create(createRoomData);
      return await this.chatRoomRepository.create(createRoomData);
    }
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
}
