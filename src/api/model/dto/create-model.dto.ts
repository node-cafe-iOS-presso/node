import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum EStatusColumn {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

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

export enum ERelationship {
  AWKWARD = '어색한 관계',
  CELEBRITY = '팬과 연예인 관계',
  COUPLE = '연인 관계',
  FAMILY = '가족 관계',
  FRIEND = '친구 관계',
}

export class CreateModelDto {
  @IsString()
  @IsNotEmpty()
  readonly name!: string; // Chatter 이름 (모델 이름)

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

  @IsEnum(ERelationship)
  @IsOptional()
  readonly relationship: string | null = null; // Chatter 관계

  @IsEnum(EStatusColumn)
  @IsNotEmpty()
  readonly isInFormal: EStatusColumn; // 추가 옵션 - 반말 모드 여부

  @IsString()
  @IsOptional()
  readonly modelCoverImage: string | null = null; // Chatter 대표 이미지

  @IsString()
  @IsNotEmpty()
  readonly question!: string; // 처음 GPT한테 할 질문
}
