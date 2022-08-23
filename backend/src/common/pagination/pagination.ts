import { PaginationResponseDto } from './pagination-response.dto';

export class Pagination<PaginationEntity> {
  public paginationResult: PaginationEntity[];
  public total: number;
  public next?: boolean;
  public nextPage?: number;

  constructor(paginationResults: PaginationResponseDto<PaginationEntity>) {
    this.paginationResult = paginationResults.paginationResult;
    this.total = paginationResults.total;
    this.next = paginationResults.next;
    this.nextPage = paginationResults.nextPage;
  }
}
