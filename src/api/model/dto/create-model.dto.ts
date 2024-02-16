import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum EModelTone {
  FRIENDLY = '친근한',
  POLITE = '정중한',
  HUMOROUS = '유머러스한',
  RUDE = '무례한',
}

export enum EModelStyle {
  ACCURATELY = '정확하게',
  CONCISELY = '간결하게',
  DETAIL = '자세하게',
}

export enum EReaderLevel {
  STUDENT = '초등학생',
  COLLEAGE = '대학생',
  EXPERT = '전문가',
}

export class CreateModelDto {
  readonly user: string;

  @IsString()
  @IsNotEmpty()
  readonly name!: string; // Chatter 이름

  @IsString()
  @IsNotEmpty()
  readonly role!: string; // Chatter 역할 (ex. 마동석)

  @IsEnum(EModelTone)
  @IsNotEmpty()
  readonly tone!: EModelTone; // Chatter 말투

  @IsEnum(EModelStyle)
  @IsNotEmpty()
  readonly style!: EModelStyle; // Chatter 대답 정확도

  @IsEnum(EReaderLevel)
  @IsNotEmpty()
  readonly readerLevel!: EReaderLevel; // Chatter 대화 난이도
}
