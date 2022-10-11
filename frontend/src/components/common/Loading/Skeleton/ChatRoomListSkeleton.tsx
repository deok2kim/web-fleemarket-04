import styled from 'styled-components';
import { useDelay } from 'src/hooks/useDelay';

function ChatRoomListSkeleton() {
  const isDelay = useDelay();

  if (isDelay) return null;

  const CHAT_COUNT = 10;
  const getRandomWidth = () => `${Math.ceil(30 + Math.random() * 50)}%`;
  return (
    <>
      {Array(CHAT_COUNT)
        .fill(0)
        .map((_, idx1) => (
          <Container key={idx1}>
            <UserAndContentWrapper>
              <InfoSkeleton width={getRandomWidth()} className="skeleton" />
              <InfoSkeleton width={getRandomWidth()} className="skeleton" />
            </UserAndContentWrapper>
            <TimeAndThumbnailAndUnreadWrapper>
              <ImageSkeleton className="skeleton" />
            </TimeAndThumbnailAndUnreadWrapper>
          </Container>
        ))}
    </>
  );
}

export default ChatRoomListSkeleton;

const Container = styled.div`
  height: 72px;

  margin: 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid ${({ theme }) => theme.color.grey300};
`;

const UserAndContentWrapper = styled.div`
  width: 100%;
  min-width: 200px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
`;

const TimeAndThumbnailAndUnreadWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const TimeAndUnreadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;

  height: 44px;
`;

const InfoSkeleton = styled.div<{ width: string }>`
  height: 19px;
  width: ${({ width }) => width};
  border-radius: 6px;
`;

const ImageSkeleton = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 6px;
`;
