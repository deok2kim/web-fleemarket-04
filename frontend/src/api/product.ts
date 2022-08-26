import axios from 'axios';
import { IServerResponse } from 'src/types/api';
import { IPaginationResponse } from 'src/types/pagination.type';
import { IProductPreview, IProductDetail } from 'src/types/product.type';

interface IProductSearchParams {
  page: number;
  category: number;
  like?: boolean;
  sell?: boolean;
}

export interface IProductParams {
  images: string[];
  title: string;
  price: number;
  content: string;
  categoryId: number;
}

export interface IProductStatusUpdateParams {
  productId: number;
  productStatusId: number;
}

export interface IProductUpdateParams extends IProductParams {
  productId: number;
}

/**
 * 상품 상세 정보 API
 * @description 해당 상품의 상세 정보를 불러옵니다.
 * @param productId 상품 ID
 **/
export const getProductById = async (productId: number): Promise<IServerResponse<IProductDetail>> => {
  const { data: productData } = await axios.get(`/products/${productId}`);
  return productData;
};

/**
 * 상품 목록 API
 * @description 상품 목록을 가져옵니다.
 * @param category 카테고리 ID
 * @param page 페이지 번호
 **/

export const getProductPagination = async ({
  page,
  category,
  like,
  sell,
}: IProductSearchParams): Promise<IServerResponse<IPaginationResponse<IProductPreview>>> => {
  const { data } = await axios.get('/products', { params: { page, category, like, sell } });
  return data;
};

/**
 * 상품 찜하기 API
 * @description 해당 상품을 찜합니다.
 * @param productId 상품 ID
 **/
export const likeProduct = async (productId: number) => {
  await axios.post('products/like', {
    productId,
  });
};

/**
 * 찜 취소 API
 * @description 해당 상품의 찜을 취소합니다.
 * @param productId 상품 ID
 **/
export const dislikeProduct = async (productId: number) => {
  await axios.delete(`products/dislike/${productId}`);
};

/**
 * 상품 등록 API
 * @description 상품을 등록합니다.
 **/
export const addProduct = async (productData: IProductParams) => {
  const { data: newProductResponse } = await axios.post('products', productData);

  return newProductResponse;
};

/**
 * 상품 상태 변경 API
 * @description 상품의 상태를 변경합니다.
 **/
export const updateProductStatus = async (productStatusUpdateData: IProductStatusUpdateParams) => {
  const { productId, productStatusId } = productStatusUpdateData;
  await axios.put(`products/${productId}/status`, {
    productStatus: productStatusId,
  });
};

/**
 * 상품 변경 API
 * @description 상품 정보를 수정합니다.
 **/
export const updateProduct = async (productUpdateData: IProductUpdateParams) => {
  const { productId, title, price, content, images, categoryId } = productUpdateData;
  await axios.put(`products/${productId}`, {
    title,
    price,
    content,
    images,
    categoryId,
  });
};
