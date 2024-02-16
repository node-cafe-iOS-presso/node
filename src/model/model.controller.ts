import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { Model } from './entities/model.entity';

@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Post()
  async create(@Body() modelData: CreateModelDto): Promise<Model> {
    return await this.modelService.create(modelData);
  }

  @Get()
  async findAll(): Promise<Model[]> {
    return this.modelService.findAll();
  }

  @Get('/user/:user')
  async findUserAll(@Param('user') userId: string): Promise<Model[]> {
    return this.modelService.findUserAll(userId);
  }

  @Get('/id/:id')
  async findOne(@Param('id') modelId: number): Promise<Model> {
    return this.modelService.findOne(modelId);
  }

  @Patch('/:user/:id')
  async update(
    @Param('id') modelId: number,
    @Param('user') userId: string,
    @Body() updateData: UpdateModelDto,
  ) {
    return this.modelService.update(modelId, userId, updateData);
  }

  @Delete('/:user/:id')
  async remove(
    @Param('id') modelId: number,
    @Param('user') userId: string,
  ): Promise<Model[]> {
    return this.modelService.remove(modelId, userId);
  }
}
