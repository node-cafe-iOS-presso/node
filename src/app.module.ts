import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './api/user/user.module';
import { ModelModule } from './api/model/model.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from './api/model/entities/model.entity';
import { ChatGptModule } from './api/chatgpt/chatgpt.module';
import { User } from './api/user/entities/user.entity';
import { Chat } from './api/chat/entities/chat.entity';
import { ChatModule } from './api/chat/chat.module';
import { ChatRoom } from './api/chat/entities/chat-room.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
      entities: [Model, User, Chat, ChatRoom],
      synchronize: Boolean(process.env.DB_SYNCHRONIZE),
    }),
    UserModule,
    ModelModule,
    ChatGptModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
