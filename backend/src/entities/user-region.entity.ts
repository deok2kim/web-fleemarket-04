import { CoreEntity } from 'src/common/entity/core.entity';
import { Region } from 'src/regions/entities/region.entity';
import User from 'src/users/entities/user.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity('user_regions')
export class UserRegion extends CoreEntity {
  @ManyToOne(() => User, (user) => user.userRegions)
  user: User;

  @ManyToOne(() => Region, (region) => region.userRegions)
  region: Region;
}
