export interface IRegion {
  /** 지역 id (e.g. 1)  */
  id: number;
  /** 지역명 (e.g. 서울특별시 성동구 용답동)  */
  name: string;
  /** 유저 선택 지역 (e.g. true) */
  isPrimary: boolean;
}
