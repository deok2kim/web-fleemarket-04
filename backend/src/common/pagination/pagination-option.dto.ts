import { IsNumber } from 'class-validator';

export class PaginationOptionDto {
  @IsNumber()
  page: number;

  @IsNumber()
  limit: number;
}
