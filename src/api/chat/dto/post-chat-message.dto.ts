import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostChatMessageDto {
  @IsNumber()
  @IsNotEmpty()
  modelId: number;

  @IsString()
  @IsNotEmpty()
  message!: string;
}
