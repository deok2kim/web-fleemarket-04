export const USER = {
  USER_INFO: ['userInfo'],
} as const;

export const CATEGORY = {
  CATEGORIES: ['categories'],
} as const;

interface IProductListPage {
  category: number;
  like?: boolean;
  sell?: boolean;
}

export const PRODUCT = {
  ALL: ['product'],
  PRODUCT_CATEGORY_PAGE: ({ category, like, sell }: IProductListPage) => [...PRODUCT.ALL, category, like, sell],
  PRODUCT_DETAIL: (productId: number) => [...PRODUCT.ALL, productId],
  PRODUCT_CHATROOMS: (productId: number) => [...PRODUCT.PRODUCT_DETAIL(productId), 'chatRooms'],
} as const;

export const REGION = {
  REGIONS: (keyword: string) => ['regions', keyword],
} as const;

export const CHAT = {
  CHATROOMS: ['chatRooms'],
  CHATROOM: (chatRoomId: string | undefined) => [...CHAT.CHATROOMS, chatRoomId],
};
