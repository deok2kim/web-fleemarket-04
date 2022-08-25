import Categories from 'src/components/Category/Categories';
import BottomNavigation from 'src/components/common/BottomNavigation/BottomNavigation';
import Header from 'src/components/common/Header/Header';
import Products from 'src/components/Product/ProductList/Products';
import withAuth from 'src/hocs/withAuth';
import { useCategory } from 'src/hooks/useCategory';
import { useProductPagination } from 'src/queries/product';

function Like() {
  const { category, onChangeCategory } = useCategory();
  const { data: productList, isFetching, fetchNextPage, hasNextPage } = useProductPagination(category, true);

  return (
    <>
      <Header headerTheme="offWhite" center={<p>찜목록</p>} />
      <Categories selectedCategory={category} onChangeCategory={onChangeCategory} />
      <Products
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

export default withAuth(Like);
