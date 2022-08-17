import { Column, Entity } from 'typeorm';
import { CoreEntity } from 'src/common/entity/core.entity';
import { ProductStatusEnum } from 'src/common/enum/product-status.enum';

@Entity()
export default class ProductStatus extends CoreEntity {
  @Column({ type: 'enum', enum: ProductStatusEnum })
  name: string;
}
