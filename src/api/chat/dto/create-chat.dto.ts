import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateChatDto {
  @IsNumber()
  @IsNotEmpty()
  chatRoomId!: number;

  @IsNumber()
  @IsNotEmpty()
  senderId!: number;

  @IsNumber()
  @IsNotEmpty()
  modelId!: number;

  @IsString()
  @IsNotEmpty()
  message!: string;
}
