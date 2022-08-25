import { IsBoolean, IsString } from 'class-validator';
import { PaginationOptionDto } from 'src/common/pagination/pagination-option.dto';

export class ProductPaginationDto extends PaginationOptionDto {
  @IsString()
  categoryId: number;

  @IsBoolean()
  like: boolean;
}
