import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Product from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAllCategory() {
    const categories = await this.categoryRepository.find();
    return { categories };
  }

  async findAllProducts() {
    const products = await this.productRepository
      .createQueryBuilder('product')
      .select([
        'product.id',
        'product.title',
        'product.price',
        'product.createdAt',
        'user.id',
        'regions.id',
        'regionNames.name',
        'isView',
      ])
      .leftJoinAndSelect('product.images', 'image')
      .loadRelationCountAndMap('product.views', 'product.views')
      .loadRelationCountAndMap('product.likes', 'product.likes')
      .loadRelationCountAndMap('product.chatRoom', 'product.chatRoom')
      .leftJoin('product.user', 'user')
      .leftJoin('product.views', 'isView', 'user.id = isView.user_id')
      .leftJoin('user.userRegions', 'regions')
      .leftJoin('regions.region', 'regionNames')
      .getMany();

    const isView = await this.productRepository
      .createQueryBuilder('product')
      .select(['product.id', 'views'])
      .leftJoin('product.user', 'user')
      .leftJoin('product.views', 'views', 'user.id = views.user_id')
      .getMany();

    const isLike = await this.productRepository
      .createQueryBuilder('product')
      .select(['product.id', 'likes'])
      .leftJoin('product.user', 'user')
      .leftJoin('product.likes', 'likes', 'user.id = likes.user_id')
      .getMany();

    return {
      products: products.map((product, index) => ({
        ...product,
        isView: !!isView[index].views.length,
        isLike: !!isLike[index].likes.length,
      })),
    };
  }
}
