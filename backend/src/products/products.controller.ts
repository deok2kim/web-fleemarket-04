import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { ProductsService } from 'src/products/products.service';
import { LikeProductDto } from './dto/like-product.dto';
import {
  UpdateProductDto,
  UpdateProductStatusDto,
} from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly authService: AuthService,
  ) {}
  @Get('/categories')
  findAllCategory() {
    return this.productsService.findAllCategory();
  }

  @Get()
  async findAllProducts(
    @Req() req: Request,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('category') categoryId: number,
    @Query('like') like: boolean,
    @Query('sell') sell: boolean,
  ) {
    let userId = undefined;
    const { authorization } = req.headers;

    if (authorization) {
      const token = authorization.replace('Bearer ', '');
      const { id } = await this.authService.validateToken(token);
      userId = id;
    }

    return this.productsService.findProducts(
      {
        limit,
        page: page || 1,
        categoryId,
        like,
        sell,
      },
      userId,
    );
  }

  @Get('/:productId')
  async findProductById(
    @Req() req: Request,
    @Param('productId') productId: number,
  ) {
    let userId = undefined;
    const { authorization } = req.headers;

    if (authorization) {
      const token = authorization.replace('Bearer ', '');
      const { id } = await this.authService.validateToken(token);
      userId = id;
    }
    return this.productsService.findProductById(productId, userId);
  }

  @Put('/:productId')
  @UseGuards(JwtAuthGuard)
  async updateProduct(
    @Param('productId') productId: number,
    @Req() req,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productsService.updateProduct(
      req.user.id,
      productId,
      updateProductDto,
    );
  }

  @Put('/:productId/status')
  @UseGuards(JwtAuthGuard)
  async updateProductStatus(
    @Param('productId') productId: number,
    @Req() req,
    @Body() updateProductStatusDto: UpdateProductStatusDto,
  ) {
    return await this.productsService.updateProductStatus(
      req.user.id,
      productId,
      updateProductStatusDto,
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProduct(@Req() req, @Body() createProductData: CreateProductDto) {
    return await this.productsService.createProduct(
      req.user.id,
      createProductData,
    );
  }

  @Post('/like')
  @UseGuards(JwtAuthGuard)
  async likeProduct(@Req() req, @Body() likeProductDto: LikeProductDto) {
    await this.productsService.likeProduct(
      req.user.id,
      likeProductDto.productId,
    );
    return;
  }

  @Delete('/dislike/:productId')
  @UseGuards(JwtAuthGuard)
  async dislikeProduct(@Req() req, @Param('productId') productId: number) {
    await this.productsService.dislikeProduct(req.user.id, productId);
    return;
  }

  @Get('/for-chat-room/:productId')
  @UseGuards(JwtAuthGuard)
  async findProductForChatRoom(@Param('productId') productId: number) {
    return this.productsService.findProductForChatRoom(productId);
  }

  @Get('/:productId/chat-rooms')
  @UseGuards(JwtAuthGuard)
  async findProductChatRooms(
    @Param('productId') productId: number,
    @Req() req,
  ) {
    // 상품에서 채팅을 가져오기 vs 채팅에서 해당 상품만 가져오기
    return this.productsService.findChatRoomsByProductId(
      productId,
      req.user.id,
    );
  }
}
