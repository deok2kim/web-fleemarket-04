import { AxiosError } from 'axios';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { dislikeProduct, getProductById, getProductPagination, likeProduct } from 'src/api/product';
import { IServerError, IServerResponse } from 'src/types/api';
import { IPaginationResponse } from 'src/types/pagination.type';
import { IProductPreview, IProductDetail } from 'src/types/product.type';
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

export const useProductPagination = (category: number, like?: boolean) =>
  useInfiniteQuery<IServerResponse<IPaginationResponse<IProductPreview>>, AxiosError<IServerError>>(
    PRODUCT.PRODUCT_CATEGORY_PAGE(category),
    ({ pageParam = 1 }) => getProductPagination(pageParam, category, like),
    {
      getNextPageParam: (lastPage) => lastPage.data.nextPage || undefined,
    },
  );

export const useLikeProduct = (productId: number, category?: number) => {
  const queryClient = useQueryClient();
  return useMutation(() => likeProduct(productId), {
    onSuccess: () => {
      if (category) {
        queryClient.invalidateQueries(PRODUCT.PRODUCT_CATEGORY_PAGE(category));
      } else {
        queryClient.invalidateQueries(PRODUCT.PRODUCT_DETAIL(productId));
      }
    },
  });
};
export const useDisLikeProduct = (productId: number, category?: number) => {
  const queryClient = useQueryClient();

  return useMutation(() => dislikeProduct(productId), {
    onSuccess: () => {
      if (category) {
        queryClient.invalidateQueries(PRODUCT.PRODUCT_CATEGORY_PAGE(category));
      } else {
        queryClient.invalidateQueries(PRODUCT.PRODUCT_DETAIL(productId));
      }
    },
  });
};
