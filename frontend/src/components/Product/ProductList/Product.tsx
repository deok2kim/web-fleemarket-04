import { forwardRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from 'src/constants/route';
import { useToast } from 'src/contexts/ToastContext';
import { useDisLikeProduct, useLikeProduct } from 'src/queries/product';
import { useUserInfo } from 'src/queries/user';
import { useCategory } from 'src/routers/Home';
import { IProductPreview } from 'src/types/product.type';
import timeForToday from 'src/utils/ago';
import { formatPrice } from 'src/utils/formatPrice';
import styled from 'styled-components';
import Icon from '../../common/Icon/Icon';
import Image from '../../common/Image/Image';

interface Props {
  product: IProductPreview;
}

function Product({ product }: Props, ref: React.ForwardedRef<HTMLLIElement>) {
  const { category } = useCategory();
  const [like, setLike] = useState(product.isLiked);
  const [likeCount, setLikeCount] = useState(product.likes);
  const { data: userInfo } = useUserInfo();
  const likeMutation = useLikeProduct(product.id, category);
  const dislikeMutation = useDisLikeProduct(product.id, category);
  const isExistence = (count: number): boolean => count > 0;
  const navigate = useNavigate();
  const toast = useToast();

  const onClickProduct = (e: React.MouseEvent<HTMLLIElement>) => {
    navigate(`/products/${product.id}`);
  };

  const onClickHeart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!userInfo) {
      toast.error('찜은 로그인 후 가능합니다 :)', {
        onClick: () => {
          navigate(ROUTE.LOGIN);
        },
      });
      return;
    }

    if (like) {
      dislikeMutation.mutate();
      setLike(false);
      setLikeCount((count) => count - 1);
      return;
    }

    likeMutation.mutate();
    setLike(true);
    setLikeCount((count) => count + 1);
  };

  return (
    <Container onClick={onClickProduct} ref={ref}>
      <InfoWrapper>
        <Image src={product.thumbnail.url} box="lg" alt="product thumbnail image" />
        <InfoText>
          <Title>{product.title}</Title>
          <LocationAndTime>{timeForToday(product.createdAt)}</LocationAndTime>
          <Price>{formatPrice(product.price)}원</Price>
        </InfoText>
      </InfoWrapper>

      <InfoIconWrapper>
        {isExistence(product.chatRoom) && (
          <div>
            <InfoIcon>
              <Icon name="iconSpeechBubbleMini" strokeColor="grey100" />
            </InfoIcon>
            <InfoIconCount>{product.chatRoom}</InfoIconCount>
          </div>
        )}
        {isExistence(likeCount) && (
          <div>
            <InfoIcon>
              <Icon name="iconHeartMini" strokeColor="grey100" />
            </InfoIcon>
            <InfoIconCount>{likeCount}</InfoIconCount>
          </div>
        )}
      </InfoIconWrapper>
      <HeartIcon onClick={onClickHeart}>
        <Icon
          name="iconHeart"
          strokeColor={like ? 'primary200' : 'grey100'}
          fillColor={like ? 'primary200' : 'transparent'}
        />
      </HeartIcon>
    </Container>
  );
}

export default forwardRef(Product);

const Container = styled.li`
  position: relative;

  height: 139px;

  border-bottom: 1px solid ${({ theme }) => theme.color.grey300};

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 16px;
`;

const InfoWrapper = styled.div`
  width: 90%;
  height: 106px;

  display: flex;

  gap: 16px;
`;

const InfoText = styled.div`
  width: 100%;
  height: 76px;

  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InfoIconWrapper = styled.div`
  height: 24px;

  position: absolute;
  right: 16px;
  bottom: 16px;

  display: flex;
  align-items: center;
  justify-content: end;
  gap: 16px;

  div {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const HeartIcon = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;

  width: 24px;
  height: 24px;
`;

const InfoIcon = styled.div``;

const InfoIconCount = styled.div`
  ${({ theme }) => theme.fonts.linkSmall};
  color: ${({ theme }) => theme.color.grey100};
`;

const Title = styled.p`
  // TODO: 기기의 정보를 받아서 유동적으로 늘려주자. ellipsis 를 위해서
  width: 125px;

  ${({ theme }) => theme.fonts.linkMedium};

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const Price = styled.p`
  ${({ theme }) => theme.fonts.linkSmall};
`;
const LocationAndTime = styled.p`
  color: ${({ theme }) => theme.color.grey100};
  ${({ theme }) => theme.fonts.textSmall};
`;