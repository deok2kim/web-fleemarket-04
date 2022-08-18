import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../../common/entity/core.entity';

@Entity()
export class Category extends CoreEntity {
  @Column({ type: 'varchar', length: 20 })
  name: string;
}
