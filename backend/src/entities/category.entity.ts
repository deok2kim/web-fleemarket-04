import { Column, Entity } from 'typeorm';
import { CoreEntity } from 'src/common/entity/core.entity';

@Entity()
export default class Category extends CoreEntity {
  @Column({ type: 'varchar', length: 20 })
  name: string;
}
