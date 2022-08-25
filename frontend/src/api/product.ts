import axios from 'axios';
import { IServerResponse } from 'src/types/api';
import { IPaginationResponse } from 'src/types/pagination.type';
import { IProductPreview, IProductDetail } from 'src/types/product.type';

/**
 * 상품 상세 정보 API
 * @description 해당 상품의 상세 정보를 불러옵니다.
 * @param productId 상품 ID
 **/
export const getProductById = async (productId: number): Promise<IServerResponse<IProductDetail>> => {
  const { data } = await axios.get(`/products/${productId}`);
  return data;
};

/**
 * 상품 목록 API
 * @description 상품 목록을 가져옵니다.
 * @param category 카테고리 ID
 * @param page 페이지 번호
 **/

export const getProductPagination = async (
  page: number,
  category: number,
  like?: boolean,
): Promise<IServerResponse<IPaginationResponse<IProductPreview>>> => {
  const { data } = await axios.get('/products', { params: { page, category, like } });
  return data;
};

/**
 * 상품 찜하기 API
 * @description 해당 상품을 찜합니다.
 **/
export const likeProduct = async (productId: number) => {
  await axios.post('products/like', {
    productId,
  });
};

/**
 * 찜 취소 API
 * @description 해당 상품의 찜을 취소합니다.
 **/
export const dislikeProduct = async (productId: number) => {
  await axios.delete(`products/dislike/${productId}`);
};
