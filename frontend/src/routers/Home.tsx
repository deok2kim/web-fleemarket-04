import Categories from 'src/components/Category/Categories';
import BottomNavigation from 'src/components/common/BottomNavigation/BottomNavigation';
import FAB from 'src/components/common/Button/FAB';
import Header from 'src/components/common/Header/Header';
import Icon from 'src/components/common/Icon/Icon';
import Products from 'src/components/Product/Products';
import styled from 'styled-components';

function Home() {
  const testLocation = '역삼동';
  return (
    <>
      <FAB onClick={() => {}} />
      <Header
        headerTheme="primary"
        left={<Icon name="iconSearch" strokeColor="white" />}
        center={
          <Center>
            <Icon name="iconMapPin" strokeColor="white" />
            <p>{testLocation}</p>
          </Center>
        }
        right={<Icon name="iconClose" strokeColor="primary200" />}
      />
      <Categories />
      <Products />
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
