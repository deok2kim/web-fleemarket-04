import { useRef } from 'react';
import { InfiniteData } from 'react-query';
import Spinner from 'src/components/common/Loading/Spinner';
import Empty from 'src/components/common/Error/Empty';
import { useInfiniteScroll } from 'src/hooks/useInfiniteScroll';
import { IServerResponse } from 'src/types/api';
import { IPaginationResponse } from 'src/types/pagination.type';
import { IProductPreview } from 'src/types/product.type';
import styled from 'styled-components';
import Product from './Product';
import ProductListSkeleton from 'src/components/common/Loading/Skeleton/ProductListSkeleton';

interface Props {
  category: number;
  productList: InfiniteData<IServerResponse<IPaginationResponse<IProductPreview>>> | undefined;
  isFetching: boolean;
  isLoading: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<any>;
  isSellPage?: boolean;
}

function Products({ category, productList, isFetching, fetchNextPage, hasNextPage, isLoading, isSellPage }: Props) {
  const observerTarget = useRef<HTMLLIElement>(null);

  useInfiniteScroll({
    targetRef: observerTarget,
    loading: isFetching,
    loadMore: fetchNextPage,
    hasNextPage: hasNextPage ?? false,
  });

  if (isLoading) return <ProductListSkeleton />;

  if (!productList?.pages[0].data.total) {
    return <Empty />;
  }

  return (
    <Container isSellPage={isSellPage}>
      {productList?.pages.map((pages) =>
        pages.data.paginationResult.map((product) => (
          <Product
            key={product.id}
            ref={observerTarget}
            category={category}
            product={product}
            isSellPage={isSellPage}
          />
        )),
      )}
      {isFetching && <Spinner />}
    </Container>
  );
}

export default Products;

const Container = styled.ul<{ isSellPage?: boolean }>`
  height: ${({ isSellPage }) => (isSellPage ? 'calc(100vh - 130px)' : 'calc(100vh - 180px)')};
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  animation: ${({ theme }) => theme.animation.fadeIn} 0.3s ease-in;
`;
