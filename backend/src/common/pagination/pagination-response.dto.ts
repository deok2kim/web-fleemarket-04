export class PaginationResponseDto<PaginationEntity> {
  paginationResult: PaginationEntity[];
  total: number;
  next?: boolean;
}
