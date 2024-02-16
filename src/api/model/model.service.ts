import { Injectable } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from './entities/model.entity';
import { Repository } from 'typeorm';
import { ChatGptService } from '../chatgpt/chatgpt.service';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(Model)
    private modelsRepository: Repository<Model>,
    private readonly chatGptService: ChatGptService,
  ) {}

  async create(
    userId: number,
    modelData: CreateModelDto,
  ): Promise<{ newModelId: number }> {
    const { id: newModelId } = await this.modelsRepository.save({
      userId,
      ...modelData,
    });

    // ChatGPT에게 질문하고 답변받기
    const result = await this.chatGptService.createQuestionWithPrompt(
      this.generateModelPrompt(modelData),
    );
    console.log(result);

    // 채팅 DB에 저장
    // await this.modelChatRepository.save({
    //   modelId: newModelId,
    // });

    return {
      newModelId,
    };
  }

  async findAll(): Promise<Model[]> {
    return this.modelsRepository.find();
  }

  async findOne(id: number): Promise<Model> {
    return await this.modelsRepository.findOne({
      where: {
        id,
      },
    });
  }

  // async update(
  //   id: number,
  //   user: string,
  //   updateData: UpdateModelDto,
  // ): Promise<Model[]> {
  //   await this.modelsRepository.update(id, updateData);
  //   return this.findUserAll(user);
  // }

  // async remove(id: number, user: string): Promise<Model[]> {
  //   await this.modelsRepository.delete(id);
  //   return this.findUserAll(user);
  // }

  /**
   * @summary 모델 생성 API Service - 모델 첫 질문 ChatGPT Prompt 생성
   * @author  이강욱
   * @param   { CreateModelDto } createModelDto
   * @returns { string }
   */
  generateModelPrompt(createModelDto: CreateModelDto): string {
    let temp =
      '"---" 아래의 토픽에 대해 상담해줘. 그리고 아래의 옵션들을 지켜줘\n\n';

    temp += `- Role: 넌 지금부터 ${createModelDto.role}이야. ${createModelDto.role}처럼 행동해줘\n`;
    temp += `- Tone: ${createModelDto.tone}\n`;
    temp += `- Style: ${createModelDto.style}\n`;
    temp += `- Reader level: ${createModelDto.readerLevel}\n`;
    temp += '- Length: 500자 이내\n';

    if (createModelDto.relationship) {
      temp += `- Relationship: ${createModelDto.relationship}`;
    }

    temp += '---\n';
    temp += createModelDto.question;

    return temp;
  }
}
