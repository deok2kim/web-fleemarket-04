import { IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsString()
  content: string;

  @IsNumber()
  categoryId: number;

  @IsString({ each: true })
  images: string[];
}

export class UpdateProductStatusDto {
  @IsNumber()
  productStatus: number;
}
