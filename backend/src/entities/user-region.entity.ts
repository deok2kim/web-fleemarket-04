import { CoreEntity } from 'src/common/entity/core.entity';
import { Region } from 'src/regions/entities/region.entity';
import User from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('user_regions')
export class UserRegion extends CoreEntity {
  @Column()
  userId: number;

  @Column()
  regionId: number;

  @Column({ default: false })
  isPrimary: boolean;

  @ManyToOne(() => User, (user) => user.userRegions)
  user: User;

  @ManyToOne(() => Region, (region) => region.userRegions, { eager: true })
  region: Region;
}
