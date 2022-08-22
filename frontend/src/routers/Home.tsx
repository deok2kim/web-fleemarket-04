import Categories from 'src/components/Category/Categories';
import BottomNavigation from 'src/components/common/BottomNavigation/BottomNavigation';
import FAB from 'src/components/common/Button/FAB';
import Header from 'src/components/common/Header/Header';
import Products from 'src/components/Product/Products';

function Home() {
  return (
    <>
      <FAB onClick={() => {}} />
      <Header headerTheme="primary" />
      <Categories />
      <Products />
      <BottomNavigation />
    </>
  );
}

export default Home;
