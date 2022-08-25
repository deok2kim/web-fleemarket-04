import { useEffect, useState } from 'react';
import { useDisLikeProduct, useLikeProduct } from 'src/queries/product';
import { IProductDetail } from 'src/types/product.type';
import { formatPrice } from 'src/utils/formatPrice';

import styled from 'styled-components';
import Button from '../../common/Button/Button';
import Icon from '../../common/Icon/Icon';

interface Props {
  productDetail: IProductDetail;
}

function BottomBar({ productDetail }: Props) {
  const [like, setLike] = useState(productDetail.isLiked);
  const likeMutation = useLikeProduct(productDetail.product.id);
  const dislikeMutation = useDisLikeProduct(productDetail.product.id);
  const priceKr = `${formatPrice(productDetail.product.price)}원`;
  const chatText = productDetail.isSeller
    ? `채팅 목록 보기${productDetail.product.chatRoom > 0 ? `(${productDetail.product.chatRoom})` : ''}`
    : '문의하기';

  const buttonDisabled = productDetail.isSeller ? !productDetail.product.chatRoom : false;
  const onClickHeart = () => {
    if (like) {
      dislikeMutation.mutate();
      setLike(false);
      return;
    }
    likeMutation.mutate();
    setLike(true);
  };

  return (
    <Container>
      <FlexWrapper>
        <IconWrapper>
          <Icon
            name="iconHeartMini"
            size={24}
            strokeColor={like ? 'primary200' : undefined}
            fillColor={like ? 'primary200' : undefined}
            onClick={onClickHeart}
          />
        </IconWrapper>
        <Price>{priceKr}</Price>
      </FlexWrapper>
      <Button size="md" title={chatText} disabled={buttonDisabled} />
    </Container>
  );
}

export default BottomBar;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 16px;

  width: 100%;
  height: 68px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: ${({ theme }) => theme.color.white};
  box-shadow: inset 0px 1px 0px ${({ theme }) => theme.color.grey300};
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  padding-right: 16px;
  border-right: 1px solid ${({ theme }) => theme.color.grey200};
`;

const Price = styled.p`
  ${({ theme }) => theme.fonts.linkSmall};
  margin-left: 16px;

  color: ${({ theme }) => theme.color.titleActive};
`;
