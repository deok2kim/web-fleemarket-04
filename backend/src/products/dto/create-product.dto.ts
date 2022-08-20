import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
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
