import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { getCategories } from 'src/api/category';
import { IServerError, IServerResponse } from 'src/types/api';
import { ICategories } from 'src/types/category.type';
import { CATEGORY } from './queryKey';

export const useCategoriesQuery = () =>
  useQuery<IServerResponse<ICategories>, AxiosError<IServerError>>(CATEGORY.CATEGORIES, getCategories, {
    staleTime: Infinity,
  });
