import { IsString } from 'class-validator';
import { PaginationOptionDto } from 'src/common/pagination/pagination-option.dto';

export class RegionPaginationDto extends PaginationOptionDto {
  @IsString()
  search: string;
}
