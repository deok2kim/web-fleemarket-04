import { IUserInfo } from './user.type';

export interface IImage {
  /** 이미지 id (e.g 1) */
  id: number;
  /** 이미지 url (e.g https://s3 ~) */
  url: string;
  /** 해당 이미지의 상품 id (e.g 1 ) */
  productId: number;
}

export interface IProduct {
  /**  상품 id (e.g 1 ) */
  id: number;
  /**  상품 제목 (e.g 맥북 ) */
  title: string;
  /**  상품 가격 (e.g 10000000 ) */
  price: number;
  /**  상품 설명 (e.g 흠집있음 ) */
  content: string;
  /**  카테고리 이름 (e.g 디지털기기 ) */
  category: string;
  /**  상품 이미지 url 배열 (e.g [{id: 1, url: 'https://s3 ~', productId: 1}] ) */
  images: IImage[];
  /** 상품 판매자 정보 (e.g {id: 1, nickname: '큰빨간페르시아코끼리', regions: [{id: 1, name: '서울특별시 성동구 용답동'}]})  */
  user: IUserInfo;
  /**  상품 조회수 (e.g 3 ) */
  views: number;
  /**  상품 상태 (e.g 판매중 ) */
  productStatus: string;
  /**  상품 좋아요 수 (e.g 3 ) */
  likes: number;
  /**  상품 채팅 수 (e.g 1 ) */
  chatRoom: number;
  /**  상품 등록 날짜 (e.g 2022-08-19T05:48:57.830Z ) */
  createdAt: string;
}

export interface IProductDetail {
  /**  상품 정보 */
  product: IProduct;
  /** 사용자가 해당 상품에 좋아요 했는지 여부 (e.g true ) */
  isLiked: boolean;
  /** 사용자가 해당 상품의 판매자 인지 여부 (e.g true ) */
  isSeller: boolean;
}
