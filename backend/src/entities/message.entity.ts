import { Column, Entity, ManyToOne } from 'typeorm';
import { CoreEntity } from 'src/common/entity/core.entity';
import ChatRoom from './chat-room.entity';

@Entity()
export default class Message extends CoreEntity {
  @Column({ type: 'int' })
  senderId: number;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'boolean' })
  isRead: boolean;

  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.messages)
  chatRoom: ChatRoom;
}
