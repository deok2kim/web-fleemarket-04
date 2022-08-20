import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { CoreEntity } from 'src/common/entity/core.entity';
import ProductStatus from './product-status.entity';
import Image from './image.entity';
import ChatRoom from '../../chat-rooms/entities/chat-room.entity';
import { Category } from 'src/products/entities/category.entity';
import User from 'src/users/entities/user.entity';
import { Like } from '../../entities/like.entity';
import { View } from '../../entities/view.entity';

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

  @OneToMany(() => ChatRoom, (chatRoom) => chatRoom.product, { eager: true })
  chatRoom: ChatRoom[];

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @OneToMany(() => Like, (like) => like.product)
  likes: Like[];

  @OneToMany(() => View, (view) => view.product)
  views: View[];
}
