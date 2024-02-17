import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entity';
import { ChatRoom } from './entities/chat-room.entity';
import { UserModule } from '../user/user.module';
import { ChatGptModule } from '../chatgpt/chatgpt.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, ChatRoom]),
    UserModule,
    ChatGptModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [TypeOrmModule, ChatService],
})
export class ChatModule {}
