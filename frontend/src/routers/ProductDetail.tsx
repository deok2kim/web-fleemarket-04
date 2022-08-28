import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import Carousel from 'src/components/common/Carousel/Carousel';
import BottomBar from 'src/components/Product/ProductDetail/BottomBar';
import ProductContent from 'src/components/Product/ProductDetail/ProductContent';
import { useProductDetail } from 'src/queries/product';
import ProductStatusDropdown from 'src/components/Product/ProductDetail/ProductStatusDropdown';
import Spacing from 'src/components/common/Spacing/Spacing';
import Header from 'src/components/common/Header/Header';
import Icon from 'src/components/common/Icon/Icon';
import ProductEditDropdown from 'src/components/Product/ProductDetail/ProductEditDropdown';
import { ROUTE } from 'src/constants/route';
import { HOUR_SECOND } from 'src/constants/time';
import ProductDetailSkeleton from 'src/components/common/Loading/Skeleton/ProductDetailSkeleton';

function ProductDetail() {
  const navigate = useNavigate();
  const productId = useParams<{ id: string }>().id as string;
  const { data: productDetail, isLoading } = useProductDetail(+productId, {
    enabled: !!productId,
    staleTime: HOUR_SECOND,
  });
  const productImages = productDetail?.data.product.images;
  const isSeller = productDetail?.data.isSeller;

  const onClickBackIcon = () => {
    navigate(-1);
  };

  const onClickAskButton = () => {
    navigate('chat-rooms');
  };

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (!productDetail) {
    return <ProductDetailSkeleton />;
  }

  return (
    <Container>
      <ProductHeader
        headerTheme="transparent"
        left={<Icon onClick={onClickBackIcon} name="iconChevronLeft" strokeColor="grey200" />}
        right={isSeller && <ProductEditDropdown productId={productDetail.data.product.id} />}
      />
      <Carousel>
        {productImages?.map((image) => (
          <Carousel.ImageItem key={image.id} src={image.url} />
        ))}
      </Carousel>
      <Wrapper>
        <Spacing size={24} />
        {isSeller && (
          <ProductStatusDropdown
            productId={productDetail.data.product.id}
            currentStatus={productDetail?.data.product.productStatus || ''}
          />
        )}
        <Spacing size={16} />
        <ProductContent productDetail={productDetail?.data} />
      </Wrapper>
      <BottomBar productDetail={productDetail.data} />
    </Container>
  );
}

export default ProductDetail;

const Container = styled.div`
  height: 100%;
  position: relative;

  animation: ${({ theme }) => theme.animation.fadeIn} 0.3s;
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
