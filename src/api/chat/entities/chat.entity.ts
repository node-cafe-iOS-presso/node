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

  @Column({ type: 'int' })
  senderId!: number;

  @Column({ type: 'int' })
  receiverId!: number;

  @Column({ type: 'text' })
  message!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt!: Date | null;

  @DeleteDateColumn({ nullable: true })
  deletedAt!: Date | null;
}
