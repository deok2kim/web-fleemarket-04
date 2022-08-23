import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import Carousel from 'src/components/common/Carousel/Carousel';
import BottomBar from 'src/components/Product/BottomBar';
import ProductContent from 'src/components/Product/ProductContent';
import { useProductDetail } from 'src/queries/product';
import ProductStatusDropdown from 'src/components/Product/ProductStatusDropdown';
import Spacing from 'src/components/common/Spacing/Spacing';
import Header from 'src/components/common/Header/Header';
import Icon from 'src/components/common/Icon/Icon';
import ProductEditDropdown from 'src/components/Product/ProductEditDropdown';
import { ROUTE } from 'src/constants/route';

function ProductDetail() {
  const productId = useParams<{ id: string }>().id as string;
  const { data: productDetail } = useProductDetail(+productId, {
    enabled: !!productId,
  });
  const productImages = productDetail?.data.product.images;
  const isSeller = productDetail?.data.isSeller;
  const navigate = useNavigate();

  const onClickBackIcon = () => {
    navigate(ROUTE.HOME);
  };

  return (
    <Container>
      <ProductHeader
        headerTheme="transparent"
        left={<Icon onClick={onClickBackIcon} name="iconChevronLeft" strokeColor="white" />}
        right={<ProductEditDropdown />}
      />
      <Carousel>
        {productImages?.map((image) => (
          <Carousel.ImageItem key={image.id} src={image.url} />
        ))}
      </Carousel>
      <Wrapper>
        <Spacing size={24} />
        {isSeller && <ProductStatusDropdown currentStatus={productDetail?.data.product.productStatus || ''} />}
        <Spacing size={16} />
        <ProductContent productDetail={productDetail?.data} />
      </Wrapper>
      <BottomBar productDetail={productDetail?.data} />
    </Container>
  );
}

export default ProductDetail;

const Container = styled.div`
  height: 100%;
  position: relative;
  animation: ${({ theme }) => theme.animation.slideInFromRightToLeft} 0.5s;
`;

const Wrapper = styled.div`
  padding: 0 16px;
  height: calc(100% - 320px - 68px);
  overflow-y: auto;
  padding-bottom: 24px;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ProductHeader = styled(Header)`
  position: absolute;
  top: 0;
  left: 0;
`;
