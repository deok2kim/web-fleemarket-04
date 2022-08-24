import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Product from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/products/entities/category.entity';
import Image from 'src/products/entities/image.entity';
import { Like } from 'src/entities/like.entity';
import { View } from 'src/entities/view.entity';
import { ProductPaginationDto } from './dto/product-pagination.dto';
import { Pagination } from 'src/common/pagination/pagination';
import { ErrorException } from 'src/common/exception/error.exception';
import { ERROR_CODE, ERROR_MESSAGE } from 'src/common/constant/error-message';
import { DEFAULT_LIMIT } from 'src/common/constant/pagination';

const DEFAULT_PRODUCT_STATUS_ID = 1; /* 1: 'sale' */

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Image)
    private ImageRepository: Repository<Image>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(Like)
    private likeRepository: Repository<Like>,

    @InjectRepository(View)
    private viewRepository: Repository<View>,
  ) {}

  async findAllCategory() {
    const categories = await this.categoryRepository.find();
    return { categories };
  }

  async findAllProducts(options: ProductPaginationDto, userId: number) {
    const { limit, page, categoryId } = options;
    const take = limit || DEFAULT_LIMIT;
    const skip = (page - 1) * take;

    const [result, total] = await this.productRepository
      .createQueryBuilder('product')
      .select([
        'product.id',
        'product.title',
        'product.price',
        'product.createdAt',
        'user.id',
        'regions.id',
        'regionNames.name',
      ])
      .leftJoinAndSelect('product.images', 'image')
      .loadRelationCountAndMap('product.chatRoom', 'product.chatRoom')
      .leftJoinAndSelect('product.views', 'product.views')
      .leftJoinAndSelect('product.likes', 'product.likes')
      .leftJoin('product.user', 'user')
      .leftJoin('user.userRegions', 'regions')
      .leftJoin('regions.region', 'regionNames')
      .where(isNaN(categoryId) ? '' : 'product.categoryId = :categoryId', {
        categoryId,
      })
      .take(take)
      .skip(skip)
      .getManyAndCount();

    const next = skip + take <= total;

    return new Pagination({
      paginationResult: result.map((product) => {
        return {
          ...product,
          hasView: !!product.views.length,
          views: product.views.length,
          isViewed: !!product.views.find(
            (viewInfo) => viewInfo.userId === userId,
          ),
          hasLike: !!product.likes.length,
          likes: product.likes.length,
          isLiked: !!product.likes.find(
            (likeInfo) => likeInfo.userId === userId,
          ),
        };
      }),
      total,
      next,
      nextPage: next ? page + 1 : null,
    });
  }

  async findProductById(productId: number, userId?: number) {
    let isLiked;

    if (!userId) {
      isLiked = false;
    } else {
      isLiked = await this.likeRepository.findOne({
        where: {
          userId,
          productId,
        },
      });

      const isViewed = await this.viewRepository.findOne({
        where: {
          productId,
          userId,
        },
      });

      if (!isViewed) {
        await this.viewRepository.save({
          productId,
          userId,
        });
      }
    }

    const product = await this.productRepository
      .createQueryBuilder('product')
      .select([
        'product.id',
        'product.title',
        'product.price',
        'product.content',
        'product.createdAt',
        'user.id',
        'user.nickname',
        'regions.id',
        'regionNames.id',
        'regionNames.name',
        'isView',
      ])
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.productStatus', 'productStatus')
      .loadRelationCountAndMap('product.views', 'product.views')
      .loadRelationCountAndMap('product.likes', 'product.likes')
      .loadRelationCountAndMap('product.chatRoom', 'product.chatRoom')
      .leftJoin('product.user', 'user')
      .leftJoin('product.views', 'isView', 'user.id = isView.user_id')
      .leftJoin('user.userRegions', 'regions')
      .leftJoin('regions.region', 'regionNames')
      .where('product.id = :productId', { productId })
      .getOne();

    return {
      product: {
        ...product,
        category: product.category.name,
        productStatus: product.productStatus.name,
        user: {
          id: product.user.id,
          nickname: product.user.nickname,
          regions: product.user.userRegions.map((userRegion) => ({
            id: userRegion.region.id,
            name: userRegion.region.name,
          })),
        },
      },
      isLiked: !!isLiked,
      isSeller: product.user.id === userId,
    };
  }

  async createProduct(userId: number, productData: CreateProductDto) {
    const { title, price, content, categoryId, images } = productData;

    const newProduct = await this.productRepository.save({
      title,
      price,
      content,
      categoryId,
      userId,
      productStatusId: DEFAULT_PRODUCT_STATUS_ID,
    });

    const promiseImages = images.map(async (image) => {
      return await this.ImageRepository.save({
        productId: newProduct.id,
        url: image,
      });
    });
    await Promise.all(promiseImages);

    return;
  }

  async likeProduct(userId: number, productId: number) {
    const isLiked = this.likeRepository.findOne({
      where: {
        userId,
        productId,
      },
    });

    if (isLiked) {
      throw new ErrorException(
        ERROR_MESSAGE.ALREADY_LIKE,
        ERROR_CODE.ALREADY_LIKE,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.likeRepository.save({
      userId,
      productId,
    });
    return;
  }

  async dislikeProduct(userId: number, productId: number) {
    const isLiked = await this.likeRepository.findOne({
      where: {
        userId,
        productId,
      },
    });

    if (!isLiked) {
      throw new ErrorException(
        ERROR_MESSAGE.NOT_LIKED,
        ERROR_CODE.NOT_LIKED,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.likeRepository.delete({
      userId,
      productId,
    });
    return;
  }
}
