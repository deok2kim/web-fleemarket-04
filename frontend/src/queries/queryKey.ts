export const USER = {
  USER_INFO: ['userInfo'],
} as const;

export const CATEGORY = {
  CATEGORIES: ['categories'],
} as const;

export const PRODUCT = {
  PRODUCT_CATEGORY_PAGE: (category: number | undefined) => ['products', category],
  PRODUCT_DETAIL: (productId: number) => ['product', productId],
};

export const REGION = {
  REGIONS: (keyword: string) => ['regions', keyword],
} as const;
