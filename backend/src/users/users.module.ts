import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import User from 'src/users/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserRegion } from 'src/entities/user-region.entity';

import Product from 'src/products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule,
    TypeOrmModule.forFeature([User, UserRegion, Product]),
    AuthModule,
  ],
  exports: [TypeOrmModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
