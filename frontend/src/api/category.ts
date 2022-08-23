import axios from 'axios';
import { IServerResponse } from 'src/types/api';
import { ICategories } from 'src/types/category.type';

/**
 * 카테고리 목록 API
 * @description 카테고리 목록을 가져옵니다.
 **/
export const getCategories = async (): Promise<IServerResponse<ICategories>> => {
  const { data } = await axios.get('/products/categories');
  return data;
};
