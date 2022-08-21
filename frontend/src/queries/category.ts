import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { getCategories, ICategories } from 'src/api/category';
import { IServerError, IServerResponse } from 'src/types/api';
import { CATEGORY } from './queryKey';

export const useCategories = () =>
  useQuery<IServerResponse<ICategories>, AxiosError<IServerError>>(CATEGORY.CATEGORIES, getCategories, {
    staleTime: Infinity,
  });
