export interface IPaginationResponse<T> {
  /** 페이지네이션 리스트  */
  paginationResult: T[];
  /** 전체 데이터 수 */
  total: number;
  /** 다음 페이지가 있는지 */
  next?: boolean;
  /** 다음 페이지 번호 */
  nextPage?: number;
}
