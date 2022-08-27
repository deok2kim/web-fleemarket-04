import BottomNavigation from 'src/components/common/BottomNavigation/BottomNavigation';
import Header from 'src/components/common/Header/Header';
import Image from 'src/components/common/Image/Image';
import styled from 'styled-components';

function Error404() {
  return (
    <Container>
      <FixedHeader headerTheme="offWhite" center={<p>404</p>} />
      <Image name="image404" width={300} />
      <BottomNavigation />
    </Container>
  );
}

export default Error404;

const FixedHeader = styled(Header)`
  position: absolute;
  top: 0;
  left: 0;
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
