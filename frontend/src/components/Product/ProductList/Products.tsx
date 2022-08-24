import { useRef } from 'react';
import { useInfiniteScroll } from 'src/hooks/useInfiniteScroll';
import { useProductPagination } from 'src/queries/product';
import { useCategory } from 'src/routers/Home';
import styled from 'styled-components';
import Product from './Product';

function Products() {
  const { category } = useCategory();
  const { data: productList, isFetching, fetchNextPage, hasNextPage } = useProductPagination(category);
  const observerTarget = useRef<HTMLLIElement>(null);

  useInfiniteScroll({
    targetRef: observerTarget,
    loading: isFetching,
    loadMore: fetchNextPage,
    hasNextPage: hasNextPage ?? false,
  });

  return (
    <Container>
      {productList?.pages.map((pages) =>
        pages.data.paginationResult.map((product) => (
          <Product key={product.id} ref={observerTarget} product={product} />
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
