import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
