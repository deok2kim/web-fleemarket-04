import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ChatRoom from './chat-room.entity';

@Entity({
  orderBy: {
    id: 'DESC',
  },
})
export default class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'int' })
  senderId: number;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'boolean' })
  isRead: boolean;

  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.messages)
  chatRoom: ChatRoom;

  @Column()
  chatRoomId: string;
}
