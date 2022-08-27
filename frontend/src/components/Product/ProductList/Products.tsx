import { useRef } from 'react';
import { InfiniteData } from 'react-query';
import Empty from 'src/components/common/Error/Empty';
import { useInfiniteScroll } from 'src/hooks/useInfiniteScroll';
import { IServerResponse } from 'src/types/api';
import { IPaginationResponse } from 'src/types/pagination.type';
import { IProductPreview } from 'src/types/product.type';
import styled from 'styled-components';
import Product from './Product';

interface Props {
  category: number;
  productList: InfiniteData<IServerResponse<IPaginationResponse<IProductPreview>>> | undefined;
  isFetching: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<any>;
}

function Products({ category, productList, isFetching, fetchNextPage, hasNextPage }: Props) {
  const observerTarget = useRef<HTMLLIElement>(null);

  useInfiniteScroll({
    targetRef: observerTarget,
    loading: isFetching,
    loadMore: fetchNextPage,
    hasNextPage: hasNextPage ?? false,
  });

  if (isFetching) return <></>;

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
      {isFetching && <p>데이터 로딩중...</p>}
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
