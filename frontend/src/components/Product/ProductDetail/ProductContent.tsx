import { IProductDetail } from 'src/types/product.type';
import timeForToday from 'src/utils/ago';
import { getTownName } from 'src/utils/region';
import styled from 'styled-components';
import Spacing from '../../common/Spacing/Spacing';

interface Props {
  productDetail?: IProductDetail;
}

function ProductContent({ productDetail }: Props) {
  const categoryAndTimeText = `${productDetail?.product.category} ∙ ${timeForToday(
    productDetail?.product.createdAt as string,
  )}`;
  const countText = `채팅 ${productDetail?.product.chatRooms} ∙ 관심 ${productDetail?.product.likes} ∙ 조회 ${productDetail?.product.views}`;
  const regionText = `${getTownName(productDetail?.product.user.regions[0].name)}`;

  return (
    <Container>
      <Title>{productDetail?.product.title}</Title>
      <Spacing size={8} />
      <Caption>{categoryAndTimeText}</Caption>
      <Spacing size={16} />
      <Content>{productDetail?.product.content}</Content>
      <Spacing size={24} />
      <Caption>{countText}</Caption>
      <Spacing size={24} />
      <SellerWrapper>
        판매자 정보
        <UserSection>
          {productDetail?.product.user.nickname}
          <span className="region">{regionText}</span>
        </UserSection>
      </SellerWrapper>
    </Container>
  );
}

export default ProductContent;

const Container = styled.div``;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.textLarge};
`;

const Caption = styled.p`
  ${({ theme }) => theme.fonts.textXSmall};

  color: ${({ theme }) => theme.color.grey100};
`;

const Content = styled.p`
  ${({ theme }) => theme.fonts.textMedium};

  color: ${({ theme }) => theme.color.titleActive};
`;

const SellerWrapper = styled.div`
  padding: 16px;
  height: 48px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: ${({ theme }) => theme.color.offWhite};

  ${({ theme }) => theme.fonts.linkSmall};
  color: ${({ theme }) => theme.color.black};

  .region {
    ${({ theme }) => theme.fonts.textXSmall};
    color: ${({ theme }) => theme.color.grey100};
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
