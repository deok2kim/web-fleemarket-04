import ChatInput from 'src/components/ChatRoom/ChatInput';
import styled from 'styled-components';
import Header from '../../Header/Header';
import Icon from '../../Icon/Icon';

function ChatRoomDetailSkeleton() {
  const CHAT_COUNT = 15;
  const getRandomWidth = () => Math.ceil(30 + Math.random() * 50);
  const getRandomBoolean = () => Math.random() * 10 > 5;
  return (
    <>
      {/* {Array(CHAT_COUNT)
        .fill(0)
        .map((_, idx1) => (
          <Container key={idx1}>
            <UserAndContentWrapper>
              <InfoSkeleton width={getRandomWidth()} className="skeleton" />
              <InfoSkeleton width={getRandomWidth()} className="skeleton" />
            </UserAndContentWrapper>
            <TimeAndThumbnailAndunreadWrapper>
              <TimeAndunreadWrapper>
                <InfoSkeleton width="30px" className="skeleton" />
              </TimeAndunreadWrapper>
              <ImageSkeleton className="skeleton" />
            </TimeAndThumbnailAndunreadWrapper>
          </Container>
        ))} */}
      <Header
        headerTheme="white"
        left={<Icon name="iconChevronLeft" strokeColor="black" />}
        center={<InfoSkeleton width={'100px'} className="skeleton" />}
        right={<Icon name="iconOut" strokeColor="red" />}
      />
      <Wrapper>
        <InfoWrapper>
          <ImageSkeleton className="skeleton" />
          <TitleAndPriceWrapper>
            <InfoSkeleton width={`${getRandomWidth() + 20}px`} className="skeleton" />
            <InfoSkeletonSm width={`${getRandomWidth() - 20}px`} className="skeleton" />
          </TitleAndPriceWrapper>
        </InfoWrapper>
        <Status></Status>
      </Wrapper>

      <Container>
        {Array(CHAT_COUNT)
          .fill(0)
          .map((_, idx1) => (
            <SpeechBubbleSkeleton isMine={getRandomBoolean()} key={idx1}>
              <TextSkeleton className="skeleton" width={`${getRandomWidth()}%`} />
            </SpeechBubbleSkeleton>
          ))}
      </Container>
    </>
  );
}

export default ChatRoomDetailSkeleton;

const InfoSkeleton = styled.div<{ width: string }>`
  height: 20px;
  width: ${({ width }) => width};
`;

const InfoSkeletonSm = styled(InfoSkeleton)`
  height: 18px;
`;

const ImageSkeleton = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 6px;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  cursor: pointer;
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

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;

  height: 72px;

  border-top: 1px solid ${({ theme }) => theme.color.grey300};
  border-bottom: 1px solid ${({ theme }) => theme.color.grey300};
`;

const TitleAndPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`;

const Container = styled.div`
  height: calc(100% - 52px - 72px - 56px);

  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SpeechBubbleSkeleton = styled.div<{ isMine: boolean }>`
  margin: 16px;

  display: flex;
  align-items: end;
  justify-content: ${({ isMine }) => (isMine ? 'end' : 'start')};
`;

const TextSkeleton = styled.p<{ width: string }>`
  border-radius: 8px;

  max-width: 80%;

  padding: 8px;

  border-radius: 10px;

  width: ${({ width }) => width};
`;
