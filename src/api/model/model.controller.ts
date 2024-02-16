import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateModelDto } from './dto/create-model.dto';
import { Model } from './entities/model.entity';
import { UserToken } from 'src/decorators/user-token.decorator';
import { UserService } from '../user/user.service';
import { ICreateModel } from './types';

@Controller('model')
export class ModelController {
  constructor(
    private readonly userService: UserService,
    private readonly modelService: ModelService,
  ) {}

  /**
   * @summary 모델 생성하기 API
   * @author  이강욱
   * @url     [POST] /model
   * @returns { Promise<ICreateModel> }
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @UserToken() userToken: string,
    @Body() modelData: CreateModelDto,
  ): Promise<ICreateModel> {
    const user = await this.userService.findOne(userToken);
    return await this.modelService.create(user.id, modelData);
  }

  @Get()
  async findAll(): Promise<Model[]> {
    return this.modelService.findAll();
  }

  // @Get('/user/:user')
  // async findUserAll(@Param('user') userId: string): Promise<Model[]> {
  //   return this.modelService.findUserAll(userId);
  // }

  @Get('/id/:id')
  async findOne(@Param('id') modelId: number): Promise<Model> {
    return this.modelService.findOne(modelId);
  }

  // @Patch('/:user/:id')
  // async update(
  //   @Param('id') modelId: number,
  //   @Param('user') userId: string,
  //   @Body() updateData: UpdateModelDto,
  // ) {
  //   return this.modelService.update(modelId, userId, updateData);
  // }

  // @Delete('/:user/:id')
  // async remove(
  //   @Param('id') modelId: number,
  //   @Param('user') userId: string,
  // ): Promise<Model[]> {
  //   return this.modelService.remove(modelId, userId);
  // }
}
