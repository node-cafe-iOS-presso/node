import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateChatRoomDto {
  @IsNumber()
  @IsNotEmpty()
  userId!: number;

  @IsNumber()
  @IsNotEmpty()
  modelId!: number;
}
