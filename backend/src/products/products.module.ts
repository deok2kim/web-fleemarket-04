import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { ProductsController } from 'src/products/products.controller';
import { Category } from 'src/products/entities/category.entity';
import Product from 'src/products/entities/product.entity';
import Image from 'src/products/entities/image.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule,
    TypeOrmModule.forFeature([Category, Product, Image]),
    AuthModule,
  ],
  exports: [TypeOrmModule],
  controllers: [ProductsController],
  providers: [ProductsService, UsersService],
})
export class ProductsModule {}
