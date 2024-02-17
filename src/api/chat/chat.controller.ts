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
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatRoomService } from './services/chat-room.service';
import { UserToken } from 'src/decorators/user-token.decorator';
import { UserService } from '../user/user.service';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatRoomService: ChatRoomService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() createData: CreateChatDto) {
    return this.chatService.create(createData);
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

  @Get()
  findChats() {
    return this.chatService.findAll();
  }

  @Get()
  findOneRoom() {
    return this.chatService.findAll();
  }

  @Get()
  findChatRooms() {
    return this.chatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
  }
}
