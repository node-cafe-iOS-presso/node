import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Query,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatRoomService } from './services/chat-room.service';
import { UserToken } from 'src/decorators/user-token.decorator';
import { UserService } from '../user/user.service';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { ChatRoom } from './entities/chat-room.entity';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatRoomService: ChatRoomService,
    private readonly userService: UserService,
  ) {}

  /**
   * @summary 채팅방 생성 API
   * @param createRoomData
   * @returns
   */
  @Post('/chatroom')
  async createChatRoom(
    @Body() createRoomData: CreateChatRoomDto,
  ): Promise<ChatRoom> {
    return await this.chatService.createChatRoom(createRoomData);
  }

  /**
   * @summary 채팅방 조회 API
   * @author  이강욱
   * @url     [GET] /chat/room?id=
   * @returns
   */
  @Get('room')
  @HttpCode(HttpStatus.OK)
  async getChatRoomById(
    @UserToken() userToken: string,
    @Query('id', ParseIntPipe) id: number,
  ) {
    const checkChatRoomStatus = await this.chatRoomService.findOne(id);
    if (!checkChatRoomStatus) {
      throw new BadRequestException('ChatRoom Not Exist!');
    }

    const user = await this.userService.findOne(userToken);
    return await this.chatRoomService.findChatRoomById(id, user.id);
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
  async findUserRoom(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<ChatRoom[]> {
    return await this.chatRoomService.findRecentChatRoomList(userId);
  }
}
