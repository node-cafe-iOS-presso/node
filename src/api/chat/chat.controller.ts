import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { ChatRoom } from './entities/chat-room.entity';
import { PostChatMessageDto } from './dto/post-chat-message.dto';
import { Chat } from './entities/chat.entity';
import { UserToken } from 'src/decorators/user-token.decorator';

@Controller('chat')
export class ChatController {
  userService: any;
  constructor(private readonly chatService: ChatService) {}

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

  @Post('messages')
  @HttpCode(HttpStatus.CREATED)
  async postChatMessage(
    @UserToken() userToken: string,
    @Body() body: PostChatMessageDto,
  ) {
    const user = await this.userService.findOne(userToken);
    return await this.chatService.createChatMessage(user.id, body);
  }

  // @Get('/chat/:roomId')
  // async findChat(@Param('roomId') roomId: number): Promise<Chat[]> {
  //   return await this.chatService.findChat(roomId);
  // }

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
