import { Controller, Get, Query } from '@nestjs/common';
import { RegionsService } from './regions.service';

@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Get()
  async findPaginate(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search: string,
  ) {
    return this.regionsService.findRegionsPaginate({
      limit,
      page: page || 1,
      search: search || '',
    });
  }
}
