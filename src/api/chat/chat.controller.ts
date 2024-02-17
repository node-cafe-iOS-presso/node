import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { ChatRoom } from './entities/chat-room.entity';
import { Chat } from './entities/chat.entity';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('')
  async fi(): Promise<ChatRoom[]> {
    return await this.chatService.findall2();
  }

  @Post('/chatroom')
  async createChatRoom(
    @Body() createRoomData: CreateChatRoomDto,
  ): Promise<ChatRoom> {
    return await this.chatService.createChatRoom(createRoomData);
  }

  @Get('/chat/:roomId')
  async findChat(@Param('roomId') roomId: number): Promise<Chat[]> {
    return await this.chatService.findChat(roomId);
  }

  @Get('/chatroom/:userId/:modelId')
  async findOneRoom(
    @Param('userId') user: number,
    @Param('modelId') model: number,
  ): Promise<ChatRoom> {
    return await this.chatService.findOneRoom(user, model);
  }

  @Get('/chatroom/:userId')
  async findUserRoom(@Param('userId') userId: number): Promise<ChatRoom[]> {
    return await this.chatService.findUserRoom(userId);
  }
}
