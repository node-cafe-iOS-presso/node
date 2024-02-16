import { IsString } from 'class-validator';

export class CreateModelDto {
  @IsString()
  readonly user: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly person: string;

  @IsString()
  readonly attitude: string;
}
