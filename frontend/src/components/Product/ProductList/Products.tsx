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
}

function Products({ category, productList, isFetching, fetchNextPage, hasNextPage, isLoading }: Props) {
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
    <Container>
      {productList?.pages.map((pages) =>
        pages.data.paginationResult.map((product) => (
          <Product key={product.id} ref={observerTarget} category={category} product={product} />
        )),
      )}
      {isFetching && <Spinner />}
    </Container>
  );
}

export default Products;

const Container = styled.ul`
  height: calc(100vh - 190px);
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
