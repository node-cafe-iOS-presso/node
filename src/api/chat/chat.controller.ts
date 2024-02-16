import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './entities/chat.entity';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async create(@Body() createData: CreateChatDto) {
    return this.chatService.create(createData);
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
