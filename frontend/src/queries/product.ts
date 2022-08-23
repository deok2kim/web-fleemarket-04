import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { getProductById } from 'src/api/product';
import { IServerError, IServerResponse } from 'src/types/api';
import { IProductDetail } from 'src/types/product.type';
import { PRODUCT } from './queryKey';

export const useProductDetail = (
  productId: number,
  options?: UseQueryOptions<IServerResponse<IProductDetail>, AxiosError<IServerError>>,
) =>
  useQuery<IServerResponse<IProductDetail>, AxiosError<IServerError>>(
    PRODUCT.PRODUCT_DETAIL(productId),
    () => getProductById(productId),
    options,
  );