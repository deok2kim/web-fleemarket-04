import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Category } from './entities/category.entity';
import User from 'src/users/entities/user.entity';
import Product from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, User, Product])],
  exports: [TypeOrmModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
