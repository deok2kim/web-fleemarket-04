import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/common/pagination/pagination';
import { Like, Repository } from 'typeorm';
import { RegionPaginationDto } from './dto/region-pagination.dto';
import { Region } from './entities/region.entity';

const DEFAULT_LIMIT = 10;

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private regionsRepository: Repository<Region>,
  ) {}

  async findRegionsPaginate(options: RegionPaginationDto) {
    const { limit, page, search } = options;
    const take = limit || DEFAULT_LIMIT;
    const skip = (page - 1) * take;
    const [result, total] = await this.regionsRepository.findAndCount({
      where: {
        name: Like(`%${search}%`),
      },
      take,
      skip,
    });

    const next = skip + take <= total;

    return new Pagination<Region>({
      paginationResult: result,
      total,
      next,
      nextPage: next ? page + 1 : null,
    });
  }
}
