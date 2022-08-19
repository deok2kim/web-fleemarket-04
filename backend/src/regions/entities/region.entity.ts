import { Column, Entity, OneToMany } from 'typeorm';
import { CoreEntity } from 'src/common/entity/core.entity';
import { UserRegion } from 'src/entities/user-region.entity';

@Entity()
export class Region extends CoreEntity {
  @Column({ type: 'varchar', length: 45 })
  name: string;

  @OneToMany(() => UserRegion, (userRegion) => userRegion.region)
  userRegions: Promise<UserRegion[]>;
}
