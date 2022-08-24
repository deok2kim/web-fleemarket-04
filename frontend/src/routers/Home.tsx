import { createContext, useCallback, useContext, useState } from 'react';
import Categories from 'src/components/Category/Categories';
import BottomNavigation from 'src/components/common/BottomNavigation/BottomNavigation';
import FAB from 'src/components/common/Button/FAB';
import Header from 'src/components/common/Header/Header';
import Icon from 'src/components/common/Icon/Icon';
import Products from 'src/components/Product/ProductList/Products';
import { useUserInfo } from 'src/queries/user';
import { getTownName } from 'src/utils/region';
import styled from 'styled-components';

interface ICategoryContext {
  category: number | undefined;
  onChangeCategory: (categoryId: number) => void;
}

const CategoryContext = createContext<ICategoryContext>({
  category: undefined,
  onChangeCategory: () => {},
});

export const useCategory = () => {
  const value = useContext(CategoryContext);

  return value;
};

function Home() {
  const { data: userInfo } = useUserInfo();
  const location = getTownName(userInfo?.data.regions[0].name) || '전체';
  const [category, setCategory] = useState<number | undefined>(undefined);

  const onChangeCategory = useCallback((categoryId: number) => {
    setCategory(categoryId);
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        category,
        onChangeCategory,
      }}
    >
      <FAB onClick={() => {}} />
      <Header
        headerTheme="primary"
        left={<Icon name="iconSearch" strokeColor="white" />}
        center={
          <Center>
            <Icon name="iconMapPin" strokeColor="white" />
            <p>{location}</p>
          </Center>
        }
      />
      <Categories />
      <Products />
      <BottomNavigation />
    </CategoryContext.Provider>
  );
}

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

export default Home;
