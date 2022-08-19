import { CoreEntity } from 'src/common/entity/core.entity';
import User from 'src/users/entities/user.entity';
import { Entity, ManyToOne } from 'typeorm';
import Product from '../products/entities/product.entity';

@Entity('likes')
export class Like extends CoreEntity {
  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @ManyToOne(() => Product, (product) => product.likes)
  product: Product;
}
