import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entity';
import { ChatRoom } from './entities/chat-room.entity';
import { ChatRoomService } from './services/chat-room.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, ChatRoom]), UserModule],
  controllers: [ChatController],
  providers: [ChatService, ChatRoomService],
  exports: [TypeOrmModule, ChatService, ChatRoomService],
})
export class ChatModule {}
