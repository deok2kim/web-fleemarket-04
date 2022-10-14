import styled from 'styled-components';

import withAuth from 'src/hocs/withAuth';

import { useChatRoomsQuery } from 'src/queries/chatRoom';
import { useNavigate } from 'react-router-dom';
import { useLoggedIn } from 'src/contexts/LoggedInContext';
import timeForToday from 'src/utils/ago';

import Image from 'src/components/common/Image/Image';
import NoData from 'src/components/common/Error/NoData';

function ChatRoomList() {
  const { isLoggedIn } = useLoggedIn();
  const { chatRooms: chatRoomList } = useChatRoomsQuery({
    enabled: isLoggedIn,
    suspense: true,
  });
  const navigate = useNavigate();

  const hasUnreadMessage = (senderId: number, partnerId: number, messageCount: number): boolean =>
    !!(senderId === partnerId && messageCount);

  const onClickChatRoom = (id: string) => {
    navigate(`/chat/${id}`);
  };

  if (chatRoomList.length === 0) return <NoData message="채팅이 없습니다." iconName="iconSpeechDoubleBubble" />;

  return (
    <Container>
      {chatRoomList.map(({ id, partner, unreadCount, product, messages }) => {
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
                {hasUnreadMessage(lastMessage.senderId, partner.id, unreadCount || 0) && <Unread>{unreadCount}</Unread>}
              </TimeAndUnreadWrapper>
              <Image src={product.thumbnail.url} box="sm" />
            </TimeAndThumbnailAndUnreadWrapper>
          </ChatItem>
        );
      })}
    </Container>
  );
}

export default withAuth(ChatRoomList);

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
