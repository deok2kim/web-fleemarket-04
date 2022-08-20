import Icon from 'src/components/common/Icon/Icon';
import Image from 'src/components/common/Image/Image';
import styled from 'styled-components';

function Login() {
  return (
    <Container>
      <Image name="imageLogo" width={185} />
      <Image name="imageBaedal" />
      <ButtonWrapper>
        <SocialButton className="kakao" href="http://localhost:4000/api/v1/auth/login/kakao">
          <Icon className="icon" name="iconKakao" />
          카카오로 계속하기
        </SocialButton>
        <SocialButton className="github" href="http://localhost:4000/api/v1/auth/login/github">
          <Icon className="icon" name="iconGithub" />
          깃허브로 계속하기
        </SocialButton>
        <SocialButton className="google" href="http://localhost:4000/api/v1/auth/login/google">
          <Icon className="icon" name="iconGoogle" />
          구글로 계속하기
        </SocialButton>
      </ButtonWrapper>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  margin-top: 84px;
  padding: 0 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SocialButton = styled.a`
  ${({ theme }) => theme.fonts.linkMedium}
  width: 100%;
  min-width: 300px;
  height: 48px;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 6px;

  .icon {
    position: absolute;
    top: 12px;
    left: 12px;
  }

  &.kakao {
    background-color: #fee500;
    color: #000000;
  }

  &.github {
    background-color: #191717;
    color: #ffffff;
  }

  &.google {
    background-color: #ffffff;
    color: rgba(0, 0, 0, 0.54);
    border: 2px solid #eaeaea;
  }
`;
