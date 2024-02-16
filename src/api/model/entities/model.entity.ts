import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EStatusColumn } from '../dto/create-model.dto';

@Entity({ name: 'model' })
export class Model {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  userId!: number; // 모델을 생성한 사용자 아이디

  @Column({ type: 'varchar' })
  name!: string; // 모델 이름

  @Column({ type: 'varchar' })
  role!: string; // 모델 역할

  @Column({ type: 'varchar' })
  tone!: string; // 모델 말투

  @Column({ type: 'varchar' })
  style!: string; // 모델 대답 정확도

  @Column({ type: 'varchar' })
  readerLevel!: string; // 모델 대화 난이도

  @Column({ type: 'varchar', nullable: true })
  relationship!: string | null; // 모델 관계

  @Column({ type: 'varchar' })
  isInFormal!: EStatusColumn; // 모델 추가옵션 (반말여부)

  @Column({ type: 'text', nullable: true })
  modelCoverImage!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt!: Date | null;

  @DeleteDateColumn({ nullable: true })
  deletedAt!: Date | null;
}
