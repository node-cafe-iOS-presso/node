import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ModelModule } from './model/model.module';
import { ChattingModule } from './chatting/chatting.module';
import { BoardModule } from './board/board.module';

@Module({
  imports: [UserModule, ModelModule, ChattingModule, BoardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
