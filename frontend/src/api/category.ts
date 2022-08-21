import axios from 'axios';
import { IServerResponse } from 'src/types/api';

export interface ICategory {
  /** 카테고리 id (e.g 1) */
  id: number;
  /** 카테고리명 (e.g 잡화) */
  name: string;
}

export interface ICategories {
  /** 카테고리 목록 (e.g. [{id: 1, name: '잡화'}]) */
  categories: ICategory[];
}

/**
 * 카테고리 목록 API
 * @description 카테고리 목록을 가져옵니다.
 **/
export const getCategories = async (): Promise<IServerResponse<ICategories>> => {
  const { data } = await axios.get('/products/categories');
  return data;
};
