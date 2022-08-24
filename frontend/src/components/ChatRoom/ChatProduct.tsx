import styled from 'styled-components';
import Image from 'src/components/common/Image/Image';
import { formatPrice } from 'src/utils/formatPrice';

function ChatProduct() {
  const product = {
    title: '빈티지 롤러 스케이트',
    price: 160000,
    status: '판매중',
    thumbnail:
      'https://post-phinf.pstatic.net/MjAxOTA0MjZfMjc2/MDAxNTU2MjE2Njc1NjAz.5GjTVBEPY0kd2SExs3uiK2eeZ1K6pCae4MwViLxf8rcg.BN2Tr6BXUaFG_IJJOB4pSFLRdHqprgQxk-ugh-W0uZ4g.JPEG/KakaoTalk_20190426_032248653.jpg?type=w1200',
  };
  return (
    <ProductWrapper>
      <ProductInfoWrapper>
        <Image src={product.thumbnail} box="sm" />
        <ProductTitleAndPriceWrapper>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductPrice>{formatPrice(product.price)}원</ProductPrice>
        </ProductTitleAndPriceWrapper>
      </ProductInfoWrapper>
      <ProductStatus>{product.status}</ProductStatus>
    </ProductWrapper>
  );
}

export default ChatProduct;

const ProductWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;

  height: 72px;

  border-top: 1px solid ${({ theme }) => theme.color.grey300};
  border-bottom: 1px solid ${({ theme }) => theme.color.grey300};
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProductStatus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 71px;
  height: 40px;

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.grey300};

  ${({ theme }) => theme.fonts.linkSmall}
`;

const ProductTitle = styled.p`
  ${({ theme }) => theme.fonts.textSmall};
`;

const ProductPrice = styled.p`
  ${({ theme }) => theme.fonts.textXSmall};
  color: ${({ theme }) => theme.color.grey100};
`;

const ProductTitleAndPriceWrapper = styled.div``;
