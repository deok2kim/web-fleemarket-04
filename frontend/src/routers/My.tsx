import BottomNavigation from 'src/components/common/BottomNavigation/BottomNavigation';
import Button from 'src/components/common/Button/Button';
import withAuth from 'src/hocs/withAuth';
import { useLogoutMutation } from 'src/queries/user';
import styled from 'styled-components';
import { useLoggedIn } from 'src/contexts/LoggedInContext';
import NicknameForm from 'src/components/NicknameForm/NicknameForm';
import Header from 'src/components/common/Header/Header';
import Spacing from 'src/components/common/Spacing/Spacing';

function My() {
  const { setIsLoggedIn } = useLoggedIn();
  const logoutMutation = useLogoutMutation();

  const onClickLogoutButton = () => {
    logoutMutation.mutate();
    setIsLoggedIn(false);
  };

  return (
    <>
      <Header headerTheme="offWhite" center={<p>마이페이지</p>} />
      <Container>
        <Spacing size={40} />
        <NicknameForm />
        <Spacing size={24} />
        <Button title="로그아웃" size="full" onClick={onClickLogoutButton} />
      </Container>
      <BottomNavigation />
    </>
  );
}

export default withAuth(My);

const Container = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
`;
