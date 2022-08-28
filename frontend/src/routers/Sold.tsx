import Categories from 'src/components/Category/Categories';
import BottomNavigation from 'src/components/common/BottomNavigation/BottomNavigation';
import Header from 'src/components/common/Header/Header';
import Products from 'src/components/Product/ProductList/Products';
import withAuth from 'src/hocs/withAuth';
import { useCategory } from 'src/hooks/useCategory';
import { useProductPagination } from 'src/queries/product';

function Sold() {
  const { category, onChangeCategory } = useCategory();
  const {
    data: productList,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useProductPagination({ category, sell: true });

  return (
    <>
      <Header headerTheme="offWhite" center={<p>판매목록</p>} />
      <Categories selectedCategory={category} onChangeCategory={onChangeCategory} />
      <Products
        isLoading={isLoading}
        category={category}
        productList={productList}
        isFetching={isFetching}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
      <BottomNavigation />
    </>
  );
}

export default withAuth(Sold);
