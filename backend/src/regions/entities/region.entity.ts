import { Column, Entity } from 'typeorm';
import { CoreEntity } from 'src/common/entity/core.entity';

@Entity()
export class Region extends CoreEntity {
  @Column({ type: 'varchar', length: 45 })
  name: string;
}
