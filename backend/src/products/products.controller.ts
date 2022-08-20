import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { ProductsService } from 'src/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get('/categories')
  findAllCategory() {
    return this.productsService.findAllCategory();
  }

  @Get()
  findAllPorudcts() {
    return this.productsService.findAllProducts();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createProduct(@Req() req, @Body() createProductData: CreateProductDto) {
    return this.productsService.createProduct(req.user.id, createProductData);
  }
}
