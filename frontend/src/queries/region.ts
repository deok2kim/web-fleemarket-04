import { AxiosError } from 'axios';
import { useInfiniteQuery } from 'react-query';
import { IServerError, IServerResponse } from 'src/types/api';

import { getRegions, IRegionResponse } from 'src/api/region';
import { REGION } from './queryKey';

export const useRegions = (keyword: string) =>
  useInfiniteQuery<IServerResponse<IRegionResponse>, AxiosError<IServerError>>(
    REGION.REGIONS(keyword),
    ({ pageParam = 1 }) => getRegions(keyword, pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.data.nextPage || undefined,
    },
  );
