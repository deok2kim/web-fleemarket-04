import { CoreEntity } from 'src/common/entity/core.entity';
import User from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import Product from '../products/entities/product.entity';

@Entity('likes')
export class Like extends CoreEntity {
  @Column()
  userId: number;

  @Column()
  productId: number;

  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @ManyToOne(() => Product, (product) => product.likes, {
    onDelete: 'CASCADE',
  })
  product: Product;
}
