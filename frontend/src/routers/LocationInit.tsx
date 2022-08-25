import { Link } from 'react-router-dom';
import Button from 'src/components/common/Button/Button';
import Icon from 'src/components/common/Icon/Icon';
import { ROUTE } from 'src/constants/route';
import styled, { keyframes } from 'styled-components';

function LocationInit() {
  return (
    <Container>
      <Title>
        처음이신가요?
        <br /> <span className="highlight">동네설정</span>을 먼저 해주세요.
      </Title>
      <Wrapper>
        <Icon name="iconMap" size={240} />

        <LinkButton to={ROUTE.LOCATION_SEARCH} state={{ isInitUser: true }}>
          등록하러가기
        </LinkButton>
      </Wrapper>
    </Container>
  );
}

export default LocationInit;

const Container = styled.div`
  padding: 0 16px;
  height: 100%;
`;

const Title = styled.h3`
  margin-top: 60px;
  white-space: pre-line;
  font-weight: 700;
  font-size: 24px;
  line-height: 1.5;

  span.highlight {
    box-shadow: inset 0 -12px 0 rgb(42 193 188 / 60%);
  }
`;

const upAndDown = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-48px);
  }
  100% {
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
  margin-top: 48px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 36px;

  #marker {
    animation: ${upAndDown} 2s ease-in-out infinite;
  }
`;

const LinkButton = styled(Link)`
  background-color: ${({ theme }) => theme.color.primary200};
  color: ${({ theme }) => theme.color.white};
  ${({ theme }) => theme.fonts.linkMedium};

  width: 100%;
  min-width: 300px;
  padding: 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 6px;
`;
