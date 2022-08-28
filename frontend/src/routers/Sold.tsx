import BottomNavigation from 'src/components/common/BottomNavigation/BottomNavigation';
import Header from 'src/components/common/Header/Header';
import Products from 'src/components/Product/ProductList/Products';
import withAuth from 'src/hocs/withAuth';

import { useProductPagination } from 'src/queries/product';

function Sold() {
  const {
    data: productList,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useProductPagination({ category: 0, sell: true });

  return (
    <>
      <Header headerTheme="offWhite" center={<p>판매목록</p>} />
      <Products
        isLoading={isLoading}
        category={0}
        productList={productList}
        isFetching={isFetching}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isSellPage={true}
      />
      <BottomNavigation />
    </>
  );
}

export default withAuth(Sold);
