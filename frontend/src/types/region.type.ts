export interface IRegion {
  /** 동네 id (e.g 1) */
  id: number;
  /** 동네명 (e.g 잡화) */
  name: string;
}
export interface IRegionResponse {
  /** 동네 목록 (e.g. [{id: 1, name: '서울특별시 서초구 서초3동'}]) */
  paginationResult: IRegion[];
  /** 전체 동네 수 */
  total: number;
  /** 다음 페이지가 있는지 */
  next: boolean;
  /** 다음 페이지 번호 */
  nextPage: number;
}
