import axios from 'axios';
import { IServerResponse } from 'src/types/api';
import { IPaginationResponse } from 'src/types/pagination.type';
import { IRegion } from 'src/types/region.type';

/**
 * 동네 목록 API
 * @description 동네 목록을 가져옵니다.
 **/

export const getRegions = async (
  keyword: string,
  page: number,
): Promise<IServerResponse<IPaginationResponse<IRegion>>> => {
  const REGION_LIMIT = 20;
  const { data } = await axios.get('/regions', { params: { search: keyword, page, limit: REGION_LIMIT } });
  return data;
};
