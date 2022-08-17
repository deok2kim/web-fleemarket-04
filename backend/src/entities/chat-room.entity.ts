import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CoreEntity } from 'src/common/entity/core.entity';
import Message from './message.entity';
import Product from './product.entity';

@Entity()
export default class ChatRoom extends CoreEntity {
  @Column({ type: 'int' })
  deleteUser: number;

  @OneToMany(() => Message, (message) => message.chatRoom)
  messages: Promise<Message[]>;

  @ManyToOne(() => Product)
  product: Product;
}
