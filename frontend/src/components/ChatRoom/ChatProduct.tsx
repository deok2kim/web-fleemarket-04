import styled from 'styled-components';
import Image from 'src/components/common/Image/Image';
import { formatPrice } from 'src/utils/formatPrice';
import { IProductPreviewForChat } from 'src/types/chatRoom';

interface Props {
  product: IProductPreviewForChat;
}

function ChatProduct({ product }: Props) {
  if (!product) return null;
  const {
    thumbnail: { url },
    title,
    price,
    productStatus,
  } = product;
  return (
    <Wrapper>
      <InfoWrapper>
        <Image src={url} box="sm" />
        <TitleAndPriceWrapper>
          <Title>{title}</Title>
          <Price>{formatPrice(price)}원</Price>
        </TitleAndPriceWrapper>
      </InfoWrapper>
      <Status>{productStatus}</Status>
    </Wrapper>
  );
}

export default ChatProduct;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;

  height: 72px;

  border-top: 1px solid ${({ theme }) => theme.color.grey300};
  border-bottom: 1px solid ${({ theme }) => theme.color.grey300};
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Status = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 71px;
  height: 40px;

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.grey300};

  ${({ theme }) => theme.fonts.linkSmall}
`;

const Title = styled.p`
  ${({ theme }) => theme.fonts.textSmall};
`;

const Price = styled.p`
  ${({ theme }) => theme.fonts.textXSmall};
  color: ${({ theme }) => theme.color.grey100};
`;

const TitleAndPriceWrapper = styled.div``;