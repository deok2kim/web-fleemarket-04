import axios from 'axios';
import { IServerResponse } from 'src/types/api';
import { IProductDetail } from 'src/types/product.type';

/**
 * 상품 상세 정보 API
 * @description 해당 상품의 상세 정보를 불러옵니다.
 * @param productId 상품 ID
 **/
export const getProductById = async (productId: number): Promise<IServerResponse<IProductDetail>> => {
  const { data } = await axios.get(`/products/${productId}`);
  return data;
};
