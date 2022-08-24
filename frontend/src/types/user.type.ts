import { IRegion } from './region.type';

export interface IUserRegion {
  id: number;
  region: {
    name: string;
  };
}

export interface IUser {
  id: number;
  userRegions: IUserRegion[];
}

export interface IUserInfo {
  /** 유저 id (e.g. 1)  */
  id: number;
  /** 유저 닉네임 (e.g. "큰빨간페르시아코끼리") */
  nickname: string;
  /** 유저 지역 정보 목록 (e.g. [{id: 1, name: '서울특별시 성동구 용답동'}]) */
  regions: IRegion[];
}
