import Header from 'src/components/common/Header/Header';
import Icon from 'src/components/common/Icon/Icon';
import Image from 'src/components/common/Image/Image';
import withAuth from 'src/hocs/withAuth';
import { useChatRooms } from 'src/queries/chatRoom';
import styled from 'styled-components';
import timeForToday from 'src/utils/ago';
import BottomNavigation from 'src/components/common/BottomNavigation/BottomNavigation';
import { useNavigate } from 'react-router-dom';
import { useLoggedIn } from 'src/contexts/LoggedInContext';
import NoData from 'src/components/common/Error/NoData';
import ChatRoomListSkeleton from 'src/components/common/Loading/Skeleton/ChatRoomListSkeleton';

function ChatRoom() {
  const { isLoggedIn } = useLoggedIn();
  const { data: chatRoomList, isLoading } = useChatRooms({
    enabled: isLoggedIn,
  });
  const navigate = useNavigate();

  const hasUnreadMessage = (senderId: number, partnerId: number, messageCount: number): boolean =>
    !!(senderId === partnerId && messageCount);

  const onClickChatRoom = (id: string) => {
    navigate(`/chat/${id}`);
  };

  // if (isLoading) return <ChatRoomListSkeleton />;

  return (
    <>
      <Header headerTheme="offWhite" center={<p>채팅</p>} />
      {isLoading ? (
        <ChatRoomListSkeleton />
      ) : chatRoomList?.data.chatRooms.length ? (
        <Container>
          {chatRoomList?.data.chatRooms.map(({ id, partner, unreadCount, product, messages }) => {
            const lastMessage = messages[0];
            return (
              <ChatItem key={id} onClick={() => onClickChatRoom(id)}>
                <UserAndContentWrapper>
                  <User>{partner.nickname}</User>
                  <Content>{lastMessage.content}</Content>
                </UserAndContentWrapper>
                <TimeAndThumbnailAndUnreadWrapper>
                  <TimeAndUnreadWrapper>
                    <Time>{timeForToday(lastMessage.createdAt)}</Time>
                    {hasUnreadMessage(lastMessage.senderId, partner.id, unreadCount || 0) && (
                      <Unread>{unreadCount}</Unread>
                    )}
                  </TimeAndUnreadWrapper>
                  <Image src={product.thumbnail.url} box="sm" />
                </TimeAndThumbnailAndUnreadWrapper>
              </ChatItem>
            );
          })}
        </Container>
      ) : (
        <NoData message="채팅이 없습니다." iconName="iconSpeechDoubleBubble" />
      )}

      <BottomNavigation />
    </>
  );
}

export default withAuth(ChatRoom);

const Container = styled.div`
  height: calc(100vh - 130px);
  animation: ${({ theme }) => theme.animation.fadeIn} 0.3s ease-in;
`;

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
const TimeAndThumbnailAndUnreadWrapper = styled.div`
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

const TimeAndUnreadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;

  height: 44px;
`;
