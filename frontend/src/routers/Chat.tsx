import Header from 'src/components/common/Header/Header';
import Icon from 'src/components/common/Icon/Icon';
import Image from 'src/components/common/Image/Image';
import withAuth from 'src/hocs/withAuth';
import { useChatRooms } from 'src/queries/chatRoom';
import styled from 'styled-components';
import timeForToday from 'src/utils/ago';
import BottomNavigation from 'src/components/common/BottomNavigation/BottomNavigation';

function ChatRoom() {
  const { data: chatRoomList } = useChatRooms();

  const hasUnreadMessage = (senderId: number, partnerId: number, messageCount: number): boolean =>
    !!(senderId === partnerId && messageCount);

  return (
    <>
      <Header headerTheme="offWhite" left={<Icon name="iconChevronLeft" strokeColor="black" />} center={<p>채팅</p>} />
      {chatRoomList?.data.chatRooms.map(({ id, partner, unreadCount, product, messages }) => {
        const lastMessage = messages[0];
        return (
          <ChatItem key={id}>
            <UserAndContentWrapper>
              <User>{partner.nickname}</User>
              <Content>{lastMessage.content}</Content>
            </UserAndContentWrapper>
            <TimeAndThumbnailAndunreadWrapper>
              <TimeAndunreadWrapper>
                <Time>{timeForToday(lastMessage.createdAt)}</Time>
                {hasUnreadMessage(lastMessage.senderId, partner.id, unreadCount) && <Unread>{unreadCount}</Unread>}
              </TimeAndunreadWrapper>
              <Image src={product.thumbnail.url} box="sm" />
            </TimeAndThumbnailAndunreadWrapper>
          </ChatItem>
        );
      })}
      <BottomNavigation />
    </>
  );
}

export default withAuth(ChatRoom);

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
