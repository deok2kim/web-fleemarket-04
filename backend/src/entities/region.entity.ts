import { Column, Entity } from 'typeorm';
import { CoreEntity } from 'src/common/entity/core.entity';

@Entity()
export default class Region extends CoreEntity {
  @Column({ type: 'varchar', length: 45 })
  name: string;
}
