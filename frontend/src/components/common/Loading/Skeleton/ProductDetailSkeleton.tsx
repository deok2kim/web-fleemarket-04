import styled from 'styled-components';
import Spacing from 'src/components/common/Spacing/Spacing';

function ProductDetailSkeleton() {
  return (
    <Container>
      <CarouselSkeleton className="skeleton" />
      <Wrapper>
        <Spacing size={24} />
        <Title className="skeleton" />
        <Spacing size={16} />
        <CaptionSkeleton className="skeleton" />
        <Spacing size={40} />
        <ContentSkeleton className="skeleton" />
        <Spacing size={24} />
        <CaptionSkeleton className="skeleton" />
        <Spacing size={24} />
        <SellerSkeleton className="skeleton" />
      </Wrapper>
    </Container>
  );
}

export default ProductDetailSkeleton;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const CarouselSkeleton = styled.div`
  width: 100%;
  height: 320px;
`;

const Wrapper = styled.div`
  padding: 0 16px;
  height: calc(100% - 320px - 68px);
`;

const Title = styled.h1`
  width: 100%;
  height: 20px;
  border-radius: 28px;
`;

const CaptionSkeleton = styled.p`
  width: 40%;
  height: 16px;
  border-radius: 24px;
`;

const ContentSkeleton = styled.p`
  width: 60%;
  height: 200px;
  border-radius: 12px;
`;

const SellerSkeleton = styled.div`
  width: 100%;
  height: 60px;
  border-radius: 4px;
`;
