import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'chat' })
export class Chat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  chatRoomId!: number;

  @Column({ type: 'int', nullable: true })
  senderId!: number | null;

  @Column({ type: 'int', nullable: true })
  receiverId!: number | null;

  @Column({ type: 'int' })
  modelId!: number;

  @Column({ type: 'text' })
  message!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt!: Date | null;

  @DeleteDateColumn({ nullable: true })
  deletedAt!: Date | null;
}
