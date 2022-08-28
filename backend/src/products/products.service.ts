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
import {
  UpdateProductDto,
  UpdateProductStatusDto,
} from './dto/update-product.dto';
import ProductStatus from './entities/product-status.entity';
import { UserRegion } from 'src/entities/user-region.entity';
import {
  addUnreadMessageCount,
  getLastMessage,
  getThumbnail,
} from 'src/chat-rooms/chat-room.service';

const DEFAULT_PRODUCT_STATUS_ID = 1; /* 1: 'sale' */

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(ProductStatus)
    private productStatusRepository: Repository<ProductStatus>,

    @InjectRepository(Image)
    private imageRepository: Repository<Image>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(Like)
    private likeRepository: Repository<Like>,

    @InjectRepository(View)
    private viewRepository: Repository<View>,

    @InjectRepository(UserRegion)
    private userRegionRepository: Repository<UserRegion>,
  ) {}

  async findAllCategory() {
    const categories = await this.categoryRepository.find();
    return { categories };
  }

  async findProducts(options: ProductPaginationDto, userId: number) {
    const { limit, page, categoryId, like, sell } = options;
    const take = limit || DEFAULT_LIMIT;
    const skip = (page - 1) * take;

    let primaryRegionId;
    if (userId) {
      const primaryRegion = await this.userRegionRepository.findOne({
        where: {
          userId: userId,
          isPrimary: true,
        },
      });

      primaryRegionId = primaryRegion.regionId;
    }

    let query = this.productRepository
      .createQueryBuilder('product')
      .select([
        'product.id',
        'product.title',
        'product.price',
        'product.createdAt',
        'user.id',
        'userRegions.id',
        'region.name',
      ])
      .leftJoinAndSelect('product.images', 'image')
      .innerJoinAndSelect('product.productStatus', 'productStatus')
      .loadRelationCountAndMap('product.chatRooms', 'product.chatRooms')
      .leftJoinAndSelect('product.views', 'product.views')
      .leftJoinAndSelect('product.likes', 'product.likes')
      .leftJoin('product.user', 'user')
      .leftJoin('user.userRegions', 'userRegions')
      .leftJoin('userRegions.region', 'region')
      .where(`product.id is not null`);

    if (primaryRegionId) {
      query = query.andWhere(`userRegions.regionId = :regionId`, {
        regionId: primaryRegionId,
      });
    }

    if (categoryId) {
      query = query.andWhere('product.categoryId = :categoryId', {
        categoryId,
      });
    }
    if (like) {
      query = query.andWhere('product.likes.userId = :userId', { userId });
    }

    if (sell) {
      query = query.andWhere(`product.userId = :userId`, { userId });
    }

    query = query.take(take).skip(skip).orderBy('product.createdAt', 'DESC');

    const [result, total] = await query.getManyAndCount();

    const next = skip + take <= total;

    return new Pagination({
      paginationResult: result.map((product) => {
        const thumbnail = product.images[0];
        delete product.images;

        return {
          ...product,
          thumbnail,
          productStatus: product.productStatus.name,
          user: {
            id: product.user.id,
            nickname: product.user.nickname,
            regions: product.user.userRegions.map((userRegion) => ({
              id: userRegion.region.id,
              name: userRegion.region.name,
            })),
          },
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

  async findById(productId: number) {
    const product = await this.productRepository.findOne({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new ErrorException(
        ERROR_MESSAGE.NOT_FOUND_PRODUCT,
        ERROR_CODE.NOT_FOUND_PRODUCT,
        HttpStatus.BAD_REQUEST,
      );
    }

    return product;
  }

  async findProductById(productId: number, userId?: number) {
    const exProduct = await this.findById(productId);

    if (!exProduct) {
      throw new ErrorException(
        ERROR_MESSAGE.NOT_FOUND_PRODUCT,
        ERROR_CODE.NOT_FOUND_PRODUCT,
        HttpStatus.NOT_FOUND,
      );
    }

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
      .leftJoinAndSelect(
        'product.chatRooms',
        'chatRooms',
        'chatRooms.deleteUserId = 0',
      )
      .leftJoinAndSelect('chatRooms.messages', 'messages')
      .leftJoin('product.user', 'user')
      .leftJoin('product.views', 'isView', 'user.id = isView.user_id')
      .leftJoin('user.userRegions', 'regions')
      .leftJoin('regions.region', 'regionNames')
      .where('product.id = :productId', { productId })
      .getOne();

    const chatRoomCount = product.chatRooms.filter(
      (chatRoom) => chatRoom?.messages.length,
    ).length;
    delete product.chatRooms;
    return {
      product: {
        ...product,
        chatRooms: chatRoomCount,
        categoryId: product.category.id,
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
      return await this.imageRepository.save({
        productId: newProduct.id,
        url: image,
      });
    });
    await Promise.all(promiseImages);

    return newProduct;
  }

  async updateProduct(
    userId: number,
    productId: number,
    productData: UpdateProductDto,
  ) {
    const { title, price, content, categoryId, images } = productData;

    const product = await this.findById(productId);

    if (product.userId !== userId) {
      throw new ErrorException(
        ERROR_MESSAGE.ONLY_EDITABLE_OWNER,
        ERROR_CODE.ONLY_EDITABLE_OWNER,
        HttpStatus.BAD_REQUEST,
      );
    }

    const categoryEntity = await this.categoryRepository.findOne({
      where: {
        id: categoryId,
      },
    });

    await this.imageRepository
      .createQueryBuilder('image')
      .delete()
      .where('productId = :productId', { productId })
      .execute();

    const imagePromises = images.map(
      async (url) =>
        await this.imageRepository.save({
          productId,
          url,
        }),
    );

    await Promise.all(imagePromises);

    return await this.productRepository
      .createQueryBuilder('product')
      .update('product')
      .set({
        title: title || product.title,
        price: price || product.price,
        content: content || product.content,
        category: categoryEntity || product.category,
      })
      .where('id = :productId', { productId })
      .execute();
  }

  async updateProductStatus(
    userId: number,
    productId: number,
    productStatusDto: UpdateProductStatusDto,
  ) {
    const product = await this.findById(productId);

    if (product.userId !== userId) {
      throw new ErrorException(
        ERROR_MESSAGE.ONLY_EDITABLE_OWNER,
        ERROR_CODE.ONLY_EDITABLE_OWNER,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newProductStatus = await this.productStatusRepository.findOne({
      where: {
        id: productStatusDto.productStatus,
      },
    });

    product.productStatus = newProductStatus;

    return await this.productRepository.save(product);
  }

  async likeProduct(userId: number, productId: number) {
    const isLiked = await this.likeRepository.findOne({
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

  async findProductForChatRoom(productId: number) {
    const productData = await this.productRepository
      .createQueryBuilder('product')
      .select([
        'product.id',
        'product.title',
        'product.price',
        'product.content',
      ])
      .leftJoinAndSelect('product.images', 'images')
      .where('product.id = :productId', { productId })
      .getOne();
    const thumbnail = productData.images[0];
    delete productData.images;
    return {
      product: {
        ...productData,
        thumbnail,
      },
    };
  }

  async findChatRoomsByProductId(productId: number, userId: number) {
    const productChatRoomsData = await this.productRepository
      .createQueryBuilder('product')
      .where('product.id= :productId', {
        productId,
      })
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect(
        'product.chatRooms',
        'chatRooms',
        'chatRooms.deleteUserId = 0',
      )
      .leftJoinAndSelect('chatRooms.buyer', 'buyer')
      .leftJoinAndSelect('chatRooms.messages', 'messages')
      .getOne();

    const thumbnail = getThumbnail(productChatRoomsData.images);
    delete productChatRoomsData.images;
    const chatRooms = productChatRoomsData.chatRooms
      .filter((chatRoomOne) => chatRoomOne.messages.length)
      .map((chatRoomOne) => addUnreadMessageCount(chatRoomOne, userId))
      .map((chatRoomOne) => {
        delete chatRoomOne.deleteUserId;
        delete chatRoomOne.productId;
        delete chatRoomOne.sellerId;
        delete chatRoomOne.buyerId;
        delete chatRoomOne.buyer.provider;
        delete chatRoomOne.buyer.snsId;
        const lastMessage = getLastMessage(chatRoomOne.messages)[0];
        delete chatRoomOne.messages;
        return {
          ...chatRoomOne,
          lastMessage,
        };
      });
    delete productChatRoomsData.price;
    delete productChatRoomsData.content;
    delete productChatRoomsData.categoryId;
    delete productChatRoomsData.productStatusId;
    delete productChatRoomsData.userId;
    return {
      productChatRooms: {
        ...productChatRoomsData,
        thumbnail,
        chatRooms,
      },
    };
  }

  async deleteProduct(userId: number, productId: number) {
    const product = await this.findById(productId);

    if (product.userId !== userId) {
      throw new ErrorException(
        ERROR_MESSAGE.ONLY_DELETE_OWNER,
        ERROR_CODE.ONLY_DELETE_OWNER,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.productRepository
      .createQueryBuilder('product')
      .delete()
      .where('id = :productId', {
        productId,
      })
      .execute();

    return;
  }
}
