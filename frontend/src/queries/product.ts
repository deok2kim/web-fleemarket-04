import { AxiosError } from 'axios';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { Updater } from 'react-query/types/core/utils';
import {
  addProduct,
  deleteProduct,
  dislikeProduct,
  getChatRoomsByProductId,
  getProductById,
  getProductPagination,
  likeProduct,
  updateProduct,
  updateProductStatus,
} from 'src/api/product';
import { IServerError, IServerResponse } from 'src/types/api';
import { IPaginationResponse } from 'src/types/pagination.type';
import { IProductPreview, IProductDetail } from 'src/types/product.type';
import { PRODUCT } from './queryKey';

interface IProductParams {
  category: number;
  like?: boolean;
  sell?: boolean;
}

interface IUser {
  id: number;
  nickname: string;
}

interface IChatRoom {
  id: string;
  buyer: IUser;
  lastMessage: ILastMessage;
  unreadCount: number;
}

interface IThumbnail {
  id: number;
  url: string;
  productId: number;
}

interface IProductChatRoom {
  productChatRooms: {
    id: number;
    title: string;
    chatRooms: IChatRoom[];
    thumbnail: IThumbnail;
  };
}

interface ILastMessage {
  id: number;
  createdAt: string;
  senderId: number;
  content: string;
  isRead: boolean;
  chatRoomId: string;
}

export const useProductDetail = (
  productId: number,
  options?: UseQueryOptions<IServerResponse<IProductDetail>, AxiosError<IServerError>>,
) =>
  useQuery<IServerResponse<IProductDetail>, AxiosError<IServerError>>(
    PRODUCT.PRODUCT_DETAIL(productId),
    () => getProductById(productId),
    options,
  );

export const useProductPagination = ({ category, like, sell }: IProductParams) =>
  useInfiniteQuery<IServerResponse<IPaginationResponse<IProductPreview>>, AxiosError<IServerError>>(
    PRODUCT.PRODUCT_CATEGORY_PAGE({ category, like, sell }),
    ({ pageParam = 1 }) => getProductPagination({ page: pageParam, category, like, sell }),
    {
      getNextPageParam: (lastPage) => lastPage.data.nextPage || undefined,
    },
  );

export const useLikeProduct = (productId: number, category?: number) => {
  const queryClient = useQueryClient();
  return useMutation(() => likeProduct(productId), {
    onSuccess: () => {
      if (category) {
        queryClient.removeQueries(PRODUCT.PRODUCT_CATEGORY_PAGE({ category }));
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
        queryClient.removeQueries(PRODUCT.PRODUCT_CATEGORY_PAGE({ category }));
      } else {
        queryClient.invalidateQueries(PRODUCT.PRODUCT_DETAIL(productId));
      }
    },
  });
};

export const useAddProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(addProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(PRODUCT.ALL);
    },
  });
};

export const useUpdateProductStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(updateProductStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(PRODUCT.ALL);
    },
  });
};

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(updateProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(PRODUCT.ALL);
    },
  });
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(PRODUCT.PRODUCT_CATEGORY_PAGE({ category: 0 }));
      queryClient.invalidateQueries(PRODUCT.PRODUCT_CATEGORY_PAGE({ category: 0, sell: true }));
    },
  });
};

/**
 * 해당 상품의 채팅방을 가져오는 쿼리
 * @param productId
 * @param options
 * @returns
 */
export const useProductChatRoomsQuery = (
  productId: number,
  options?: UseQueryOptions<IServerResponse<IProductChatRoom>, AxiosError<IServerError>>,
) =>
  useQuery<IServerResponse<IProductChatRoom>, AxiosError<IServerError>>(
    PRODUCT.PRODUCT_CHATROOMS(productId),
    () => getChatRoomsByProductId(productId),
    options,
  );
