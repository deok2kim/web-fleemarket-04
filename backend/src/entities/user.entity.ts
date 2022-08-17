import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { OAuthProviderEnum } from 'src/common/enum/oauth-provider.enum';
import { CoreEntity } from 'src/common/entity/core.entity';
import Region from './region.entity';
import Product from './product.entity';

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
}
