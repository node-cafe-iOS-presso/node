import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from './entities/model.entity';
import { ChatGptModule } from '../chatgpt/chatgpt.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Model]), ChatGptModule, UserModule],
  exports: [TypeOrmModule],
  controllers: [ModelController],
  providers: [ModelService],
})
export class ModelModule {}
