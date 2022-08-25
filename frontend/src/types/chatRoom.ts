import { IImage } from './product.type';

export interface IMessage {
  /** 메세지 id (e.g 1) */
  id: number;
  /** 메세지 보내는 사람 id (e.g 1) */
  senderId: number;
  /** 메세지 내용 id (e.g 안녕하세요^^) */
  content: string;
  /** 메세지를 상대방이 읽었는지 id (e.g true) */
  isRead: boolean;
  /** 채팅방 id (e.g 46-1-3) */
  chatRoomId: string;
  /** 메세지 전송 날짜 id (e.g 2022-08-19T05:48:57.830Z ) */
  createdAt: string;
}

export interface IChatRoom {
  /** 채팅방 id (e.g 1) */
  id: number;
  /** 상품 id (e.g 46) */
  productId: number;
  /** 판매자 id (e.g 1) */
  sellerId: number;
  /** 구매자 id (e.g 3) */
  buyerId: number;
  /** 읽지 않은 메세지 수 id (e.g 1) */
  unreadCount: number;
  /** 채팅방을 삭제한 유저 id (e.g 1) */
  deleteUserId: number;
  /** 메세지 배열 (e.g [{"id": 21, "createdAt": "2022-08-23T22:20:24.421Z", "senderId": 1, "content": "구매자님 죄송합니다만, 잠실역은 어려울것 같습니다.", "isRead": true, "chatRoomId": "46-3-1" }]) */
  messages: IMessage[];
  /** 상품 정보 id (e.g {"id": 46, "title": "상품 등록 테스트 title1231235555", "price": 1500000, "productStatusId": 1, "thumbnail": { "id": 71, "url": "https://www.apple.com/v/airpods-max/e/images/overview/hero__gnfk5g59t0qe_xlarge.png", "productId": 46 } },) */
  product: IProductPreviewForChat;
  /** 채팅 상대 id (e.g 3) */
  partner: IUserForChat;
}

export interface IChatRooms {
  /** 채팅방 목록 (e.g. { "chatRooms": [ { "deleteUserId": 0, "productId": 46, "sellerId": 3, "buyerId": 1, "id": "46-3-1", "messages": [ { "id": 21, "createdAt": "2022-08-23T22:20:24.421Z", "senderId": 1, "content": "구매자님 죄송합니다만, 잠실역은 어려울것 같습니다.", "isRead": true, "chatRoomId": "46-3-1" } ], "product": { "id": 46, "title": "상품 등록 테스트 title1231235555", "price": 1500000, "productStatusId": 1, "thumbnail": { "id": 71, "url": "https://www.apple.com/v/airpods-max/e/images/overview/hero__gnfk5g59t0qe_xlarge.png", "productId": 46 } }, "unreadCount": 4 } ]) */
  chatRooms: IChatRoom[];
}

export interface IProductPreviewForChat {
  /**  상품 id (e.g 1 ) */
  id: number;
  /**  상품 제목 (e.g 맥북 ) */
  title: string;
  /**  상품 가격 (e.g 10000000 ) */
  price: number;
  /**  상품 상태 id (e.g 1 ) */
  productStatusId: number;
  /**  상품 썸네일 이미지 (e.g {"id": 71,"url": "https://www.apple.com/v/airpods-max/e/images/overview/hero__gnfk5g59t0qe_xlarge.png","productId": 46}) */
  thumbnail: IImage;
}

export interface IUserForChat {
  /** 유저 id (e.g 1 ) */
  id: number;
  /** 유저 닉네임 id (e.g 1 ) */
  nickname: string;
}
