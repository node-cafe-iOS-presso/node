import { Injectable } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from './entities/model.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(Model)
    private modelsRepository: Repository<Model>,
  ) {}

  async create(modelData: CreateModelDto) {
    const newModel = this.modelsRepository.create(modelData);
    this.modelsRepository.save(newModel);
    return await newModel;
  }

  async findAll(): Promise<Model[]> {
    return this.modelsRepository.find();
  }

  async findUserAll(user: string): Promise<Model[]> {
    return await this.modelsRepository.find({
      where: {
        user,
      },
    });
  }

  async findOne(id: number): Promise<Model> {
    return await this.modelsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    user: string,
    updateData: UpdateModelDto,
  ): Promise<Model[]> {
    await this.modelsRepository.update(id, updateData);
    return this.findUserAll(user);
  }

  async remove(id: number, user: string): Promise<Model[]> {
    await this.modelsRepository.delete(id);
    return this.findUserAll(user);
  }
}
