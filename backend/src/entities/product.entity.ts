import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { CoreEntity } from 'src/common/entity/core.entity';
import Category from './category.entity';
import ProductStatus from './product-status.entity';
import Image from './image.entity';
import User from './user.entity';
import ChatRoom from './chat-room.entity';

@Entity()
export default class Product extends CoreEntity {
  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'text' })
  content: string;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @ManyToOne(() => Category)
  category: Promise<Category>;

  @ManyToOne(() => ProductStatus, {
    eager: true,
  })
  productStatus: ProductStatus;

  @OneToMany(() => Image, (image) => image.product, {
    eager: true,
  })
  images: Image[];

  @ManyToMany(() => User, { eager: true })
  @JoinTable({
    name: 'like',
  })
  likes: User[];

  @ManyToMany(() => User, { eager: true })
  @JoinTable({
    name: 'view',
  })
  views: User[];

  @OneToMany(() => ChatRoom, (chatRoom) => chatRoom.product, { eager: true })
  chatRoom: ChatRoom[];

  @ManyToOne(() => User, (user) => user.products)
  user: User;
}
