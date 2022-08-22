import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { ProductsService } from 'src/products/products.service';

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
  ) {
    let userId = undefined;
    const { authorization } = req.headers;

    if (authorization) {
      const token = authorization.replace('Bearer ', '');
      const { id } = await this.authService.validateToken(token);
      userId = id;
    }

    return this.productsService.findAllProducts(
      {
        limit,
        page: page || 1,
        categoryId,
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

  @Post()
  @UseGuards(JwtAuthGuard)
  createProduct(@Req() req, @Body() createProductData: CreateProductDto) {
    return this.productsService.createProduct(req.user.id, createProductData);
  }
}
