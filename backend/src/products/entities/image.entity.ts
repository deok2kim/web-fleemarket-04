import { Column, Entity, ManyToOne } from 'typeorm';
import { CoreEntity } from 'src/common/entity/core.entity';
import Product from './product.entity';

@Entity()
export default class Image extends CoreEntity {
  @Column({ type: 'varchar' })
  url: string;

  @Column()
  productId: number;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  product: Product;
}
