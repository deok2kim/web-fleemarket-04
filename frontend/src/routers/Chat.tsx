import Header from 'src/components/common/Header/Header';
import Icon from 'src/components/common/Icon/Icon';
import Image from 'src/components/common/Image/Image';
import withAuth from 'src/hocs/withAuth';
import styled from 'styled-components';

function ChatRoom() {
  const chatList = [
    {
      id: 1,
      sellerNickName: '코끼리',
      lastMessage: '혹시 팔렸나요?',
      time: '15분 전',
      thumbnail:
        'https://post-phinf.pstatic.net/MjAxOTA0MjZfMjc2/MDAxNTU2MjE2Njc1NjAz.5GjTVBEPY0kd2SExs3uiK2eeZ1K6pCae4MwViLxf8rcg.BN2Tr6BXUaFG_IJJOB4pSFLRdHqprgQxk-ugh-W0uZ4g.JPEG/KakaoTalk_20190426_032248653.jpg?type=w1200',
      unReadCount: 3,
    },
    {
      id: 2,
      sellerNickName: '사자',
      lastMessage: '넵 감사합ㄴ다~',
      time: '18시간 전',
      thumbnail:
        'https://post-phinf.pstatic.net/MjAxOTA0MjZfMjc2/MDAxNTU2MjE2Njc1NjAz.5GjTVBEPY0kd2SExs3uiK2eeZ1K6pCae4MwViLxf8rcg.BN2Tr6BXUaFG_IJJOB4pSFLRdHqprgQxk-ugh-W0uZ4g.JPEG/KakaoTalk_20190426_032248653.jpg?type=w1200',
      unReadCount: 0,
    },
    {
      id: 3,
      sellerNickName: '강아지',
      lastMessage: '조금 더 생각해볼게요 ㅠㅠㅠ',
      time: '1일 전',
      thumbnail:
        'https://post-phinf.pstatic.net/MjAxOTA0MjZfMjc2/MDAxNTU2MjE2Njc1NjAz.5GjTVBEPY0kd2SExs3uiK2eeZ1K6pCae4MwViLxf8rcg.BN2Tr6BXUaFG_IJJOB4pSFLRdHqprgQxk-ugh-W0uZ4g.JPEG/KakaoTalk_20190426_032248653.jpg?type=w1200',
      unReadCount: 0,
    },
  ];

  const hasUnReadMessage = (count: number) => !!count;

  return (
    <>
      <Header headerTheme="offWhite" left={<Icon name="iconChevronLeft" strokeColor="black" />} center={<p>채팅</p>} />
      {chatList.map((chat) => (
        <ChatItem key={chat.id}>
          <UserAndContentWrapper>
            <User>{chat.sellerNickName}</User>
            <Content>{chat.lastMessage}</Content>
          </UserAndContentWrapper>
          <TimeAndThumbnailAndUnReadWrapper>
            <TimeAndUnReadWrapper>
              <Time>{chat.time}</Time>
              {hasUnReadMessage(chat.unReadCount) && <UnRead>{chat.unReadCount}</UnRead>}
            </TimeAndUnReadWrapper>
            <Image src={chat.thumbnail} box="sm" />
          </TimeAndThumbnailAndUnReadWrapper>
        </ChatItem>
      ))}
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

const UserAndContentWrapper = styled.div``;

const User = styled.p`
  ${({ theme }) => theme.fonts.linkSmall}
`;
const Content = styled.p`
  ${({ theme }) => theme.fonts.textSmall};
  color: ${({ theme }) => theme.color.grey100};
`;
const TimeAndThumbnailAndUnReadWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const Time = styled.p`
  ${({ theme }) => theme.fonts.textSmall};
  color: ${({ theme }) => theme.color.grey100};
`;

const UnRead = styled.p`
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

const TimeAndUnReadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;

  height: 44px;
`;
