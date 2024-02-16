import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'chat_room' })
export class ChatRoom {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  userId!: string;

  @Column({ type: 'int' })
  modelId!: number;
}
