import { Chat } from './../chat/entities/chat.entity';
import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from './entities/model.entity';
import { ChatGptModule } from '../chatgpt/chatgpt.module';
import { UserModule } from '../user/user.module';
import { ChatRoom } from '../chat/entities/chat-room.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Model, Chat, ChatRoom]),
    ChatGptModule,
    UserModule,
  ],
  exports: [TypeOrmModule],
  controllers: [ModelController],
  providers: [ModelService],
})
export class ModelModule {}
