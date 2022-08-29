import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from 'src/constants/route';
import { useLoggedIn } from 'src/contexts/LoggedInContext';
import { useToast } from 'src/contexts/ToastContext';
import { useDebouncedCallback } from 'src/hooks/useDebounceCallback';
import { useDisLikeProduct, useLikeProduct } from 'src/queries/product';
import { useUserInfo } from 'src/queries/user';
import { IProductDetail } from 'src/types/product.type';
import { formatPrice } from 'src/utils/formatPrice';

import styled from 'styled-components';
import Button from '../../common/Button/Button';
import Icon from '../../common/Icon/Icon';

interface Props {
  productDetail: IProductDetail;
}

function BottomBar({ productDetail }: Props) {
  const { isLoggedIn } = useLoggedIn();
  const navigate = useNavigate();
  const userInfo = useUserInfo();
  const toast = useToast();
  const [like, setLike] = useState(productDetail.isLiked);
  const likeMutation = useLikeProduct(productDetail.product.id);
  const dislikeMutation = useDisLikeProduct(productDetail.product.id);
  const debounceLikeMutate = useDebouncedCallback(like ? dislikeMutation.mutate : likeMutation.mutate, 1000);
  const priceKr = productDetail.product.price ? `${formatPrice(productDetail.product.price)}원` : '가격미정';
  const chatText = productDetail.isSeller
    ? `채팅 목록 보기${productDetail.product.chatRooms > 0 ? `(${productDetail.product.chatRooms})` : ''}`
    : '문의하기';

  const buttonDisabled = productDetail.isSeller ? !productDetail.product.chatRooms : false;
  const onClickHeart = () => {
    if (!isLoggedIn) {
      toast.error('찜은 로그인 후 가능합니다 :)', {
        onClick: () => {
          navigate(ROUTE.LOGIN);
        },
      });
      return;
    }

    if (like) {
      setLike(false);
    } else {
      setLike(true);
    }
    debounceLikeMutate();
  };

  const onClickChatRoom = () => {
    if (productDetail.isSeller) {
      navigate('chat-rooms');
      return;
    }
    const chatRoomId = `${productDetail.product.id}-${productDetail.product.user.id}-${userInfo.data?.data.id}`;
    navigate(`${ROUTE.CHAT}/${chatRoomId}`);
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
      <Button size="md" title={chatText} onClick={onClickChatRoom} disabled={buttonDisabled} />
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
