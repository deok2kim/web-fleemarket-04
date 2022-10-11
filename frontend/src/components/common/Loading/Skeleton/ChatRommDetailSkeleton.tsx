import styled from 'styled-components';
import { useDelay } from 'src/hooks/useDelay';
import Header from '../../Header/Header';
import Icon from '../../Icon/Icon';

function ChatRoomDetailSkeleton() {
  const isDelay = useDelay();

  if (isDelay) return null;

  const CHAT_COUNT = 15;
  const getRandomWidth = () => Math.ceil(30 + Math.random() * 50);
  const getRandomBoolean = () => Math.random() * 10 > 5;
  return (
    <>
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
            <SpeechBubble isMine={getRandomBoolean()} key={idx1}>
              <TextSkeleton className="skeleton" width={`${getRandomWidth()}%`} />
            </SpeechBubble>
          ))}
      </Container>

      <ContaineChat>
        <Input placeholder="메세지를 입력하세요." />
        <button>
          <Icon name="iconSend" strokeColor="grey100" />
        </button>
      </ContaineChat>
    </>
  );
}

export default ChatRoomDetailSkeleton;

const InfoSkeleton = styled.div<{ width: string }>`
  height: 20px;
  width: ${({ width }) => width};
  border-radius: 6px;
`;

const InfoSkeletonSm = styled(InfoSkeleton)`
  height: 18px;
  border-radius: 6px;
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

const SpeechBubble = styled.div<{ isMine: boolean }>`
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

const ContaineChat = styled.form`
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;

  height: 52px;

  background-color: ${({ theme }) => theme.color.offWhite};

  border-top: 1px solid ${({ theme }) => theme.color.grey300};
  border-bottom: 1px solid ${({ theme }) => theme.color.grey300};

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  padding: 14px;

  form {
    width: 100%;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 36px;
  border-radius: 8px;
  outline: none;
  border: 1px solid ${({ theme }) => theme.color.grey300};

  padding-left: 8px;
`;
