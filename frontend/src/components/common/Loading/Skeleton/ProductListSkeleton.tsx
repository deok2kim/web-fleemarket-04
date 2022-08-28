import styled from 'styled-components';

function ProductListSkeleton() {
  const PRODUCT_COUNT = 5;
  const INFO_COUNT = 3;
  const getRandomWidth = () => Math.ceil(30 + Math.random() * 50);
  return (
    <>
      {Array(PRODUCT_COUNT)
        .fill(0)
        .map((_, idx1) => (
          <Container key={idx1}>
            <InfoWrapper>
              <ImageSkeleton className="skeleton" />
              <InfoText>
                {Array(INFO_COUNT)
                  .fill(0)
                  .map((_, idx2) => (
                    <InfoSkeleton key={idx2} width={getRandomWidth()} className="skeleton" />
                  ))}
              </InfoText>
            </InfoWrapper>
            <InfoIconWrapper />
            <HeartIcon />
          </Container>
        ))}
    </>
  );
}

export default ProductListSkeleton;

const ImageSkeleton = styled.div`
  min-width: 106px;
  height: 106px;
  border-radius: 10px;
`;
const InfoSkeleton = styled.div<{ width: number }>`
  height: 20px;
  border-radius: 4px;
  width: ${({ width }) => width}%;
`;

const Container = styled.li`
  position: relative;

  height: 139px;

  border-bottom: 1px solid transparent;

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
