import { CoreEntity } from 'src/common/entity/core.entity';
import User from 'src/users/entities/user.entity';
import { Entity, ManyToOne } from 'typeorm';
import Product from '../products/entities/product.entity';

@Entity('views')
export class View extends CoreEntity {
  @ManyToOne(() => User, (user) => user.views)
  user: User;

  @ManyToOne(() => Product, (product) => product.views)
  product: Product;
}
