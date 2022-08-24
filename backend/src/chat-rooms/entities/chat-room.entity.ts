import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import Message from './message.entity';
import Product from '../../products/entities/product.entity';
import User from 'src/users/entities/user.entity';

@Entity()
export default class ChatRoom extends BaseEntity {
  @Column({ type: 'int' })
  deleteUser: number;

  @OneToMany(() => Message, (message) => message.chatRoom, { cascade: true })
  messages: Message[];

  @ManyToOne(() => Product)
  product: Product;

  @Column()
  productId: number;

  @ManyToOne(() => User)
  seller: User;

  @Column()
  sellerId: number;

  @ManyToOne(() => User)
  buyer: User;

  @Column()
  buyerId: number;

  @CreateDateColumn()
  createdAt: Date;

  @PrimaryColumn({ name: 'id' })
  id: string;
}
