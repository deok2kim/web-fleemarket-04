import Header from 'src/components/common/Header/Header';
import Icon from 'src/components/common/Icon/Icon';
import Image from 'src/components/common/Image/Image';
import withAuth from 'src/hocs/withAuth';
import { useChatRooms } from 'src/queries/chatRoom';
import styled from 'styled-components';
import timeForToday from 'src/utils/ago';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoggedIn } from 'src/contexts/LoggedInContext';
import { useProductChatRoomsQuery } from 'src/queries/product';
import NoData from 'src/components/common/Error/NoData';

function ProductChatRooms() {
  const { isLoggedIn } = useLoggedIn();

  const productId = useParams<{ productId: string }>().productId as string;
  console.log(productId);
  const { data: productInfo } = useProductChatRoomsQuery(+productId, {
    enabled: isLoggedIn,
  });

  const navigate = useNavigate();

  const hasUnreadMessage = (senderId: number, partnerId: number, messageCount: number): boolean =>
    !!(senderId === partnerId && messageCount);

  const onClickChatRoom = (id: string) => {
    navigate(`/chat/${id}`);
  };

  const onClickBack = () => navigate(-1);

  if (!productInfo?.data.productChatRooms) return <></>;
  const { title: productTitle, thumbnail: productThumbnail, chatRooms } = productInfo?.data.productChatRooms;
  return (
    <>
      <Header
        headerTheme="offWhite"
        left={<Icon name="iconChevronLeft" strokeColor="black" onClick={onClickBack} />}
        center={<p>채팅하기</p>}
      />
      {!!chatRooms.length ? (
        chatRooms.map(({ id, unreadCount, buyer, lastMessage }) => {
          return (
            <ChatItem key={id} onClick={() => onClickChatRoom(id)}>
              <UserAndContentWrapper>
                <User>{buyer.nickname}</User>
                <Content>{lastMessage.content}</Content>
              </UserAndContentWrapper>
              <TimeAndThumbnailAndunreadWrapper>
                <TimeAndunreadWrapper>
                  <Time>{timeForToday(lastMessage.createdAt)}</Time>
                  {hasUnreadMessage(lastMessage.senderId, buyer.id, unreadCount || 0) && <Unread>{unreadCount}</Unread>}
                </TimeAndunreadWrapper>
                <Image src={productThumbnail.url} box="sm" />
              </TimeAndThumbnailAndunreadWrapper>
            </ChatItem>
          );
        })
      ) : (
        <NoData message="채팅이 없습니다." iconName="iconSpeechDoubleBubble" />
      )}
    </>
  );
}

export default withAuth(ProductChatRooms);

const ChatItem = styled.div`
  height: 72px;

  margin: 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid ${({ theme }) => theme.color.grey300};
`;

const UserAndContentWrapper = styled.div`
  max-width: 60%;
`;

const User = styled.p`
  ${({ theme }) => theme.fonts.linkSmall}
`;
const Content = styled.p`
  ${({ theme }) => theme.fonts.textSmall};
  color: ${({ theme }) => theme.color.grey100};

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const TimeAndThumbnailAndunreadWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const Time = styled.p`
  ${({ theme }) => theme.fonts.textSmall};
  color: ${({ theme }) => theme.color.grey100};
`;

const Unread = styled.p`
  width: 20px;
  height: 20px;

  border-radius: 10px;

  background-color: ${({ theme }) => theme.color.primary200};
  color: ${({ theme }) => theme.color.white};

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.fonts.textXSmall}
`;

const TimeAndunreadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;

  height: 44px;
`;
