import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { OAuthProviderEnum } from 'src/common/enum/oauth-provider.enum';
import { CoreEntity } from 'src/common/entity/core.entity';
import { Region } from '../../regions/entities/region.entity';
import Product from 'src/products/entities/product.entity';
import { Like } from 'src/entities/like.entity';
import { View } from 'src/entities/view.entity';
import { UserRegion } from 'src/entities/user-region.entity';

@Entity()
export default class User extends CoreEntity {
  @Column({ type: 'enum', enum: OAuthProviderEnum })
  provider: string;

  @Column({ type: 'varchar' })
  snsId: string;

  @Column({ type: 'varchar', unique: true, length: 20 })
  nickname: string;

  @ManyToMany(() => Region, { eager: true })
  @JoinTable({
    name: 'user_region',
  })
  regions: Region[];

  @OneToMany(() => Product, (product) => product.user)
  products: Promise<Product[]>;

  @OneToMany(() => Like, (like) => like.user)
  likes: Promise<Like[]>;

  @OneToMany(() => View, (view) => view.user)
  views: Promise<View[]>;

  @OneToMany(() => UserRegion, (userRegion) => userRegion.user)
  userRegions: Promise<UserRegion[]>;
}
