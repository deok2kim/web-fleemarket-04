import { useNavigate } from 'react-router-dom';
import Categories from 'src/components/Category/Categories';
import BottomNavigation from 'src/components/common/BottomNavigation/BottomNavigation';
import FAB from 'src/components/common/Button/FAB';
import Header from 'src/components/common/Header/Header';
import Icon from 'src/components/common/Icon/Icon';
import Products from 'src/components/Product/ProductList/Products';
import { ROUTE } from 'src/constants/route';
import { useLoggedIn } from 'src/contexts/LoggedInContext';
import { useCategory } from 'src/hooks/useCategory';
import { useProductPagination } from 'src/queries/product';
import { useUserInfo } from 'src/queries/user';
import { getTownName } from 'src/utils/region';
import styled from 'styled-components';

function Home() {
  const { isLoggedIn } = useLoggedIn();
  const { data: userInfo } = useUserInfo(isLoggedIn);
  const location = getTownName(userInfo?.data.regions.find((region) => region.isPrimary)?.name) || '전체';
  const { category, onChangeCategory } = useCategory();
  const { data: productList, isFetching, fetchNextPage, hasNextPage } = useProductPagination({ category });
  const navigate = useNavigate();

  const onClickFAB = () => {
    navigate(ROUTE.PRODUCTS_POST);
  };

  return (
    <>
      <FAB onClick={onClickFAB} />
      <Header
        headerTheme="primary"
        center={
          <Center>
            <Icon name="iconMapPin" strokeColor="white" />
            <p>{location}</p>
          </Center>
        }
      />
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

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

export default Home;
