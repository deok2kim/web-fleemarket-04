export const USER = {
  USER_INFO: ['userInfo'],
} as const;

export const CATEGORY = {
  CATEGORIES: ['categories'],
} as const;

export const PRODUCT = {
  ALL: ['product'],
  PRODUCT_USER_LIKE_PAGE: () => [...PRODUCT.ALL, 'like'],
  PRODUCT_CATEGORY_PAGE: (category: number | undefined, like?: number) => [...PRODUCT.ALL, category, like],
  PRODUCT_DETAIL: (productId: number) => [...PRODUCT.ALL, productId],
} as const;

export const REGION = {
  REGIONS: (keyword: string) => ['regions', keyword],
} as const;

export const CHAT = {
  CHATROOMS: (productId?: number) => ['chatRooms', productId],
};
