import { useNavigate } from 'react-router-dom';
import BottomNavigation from 'src/components/common/BottomNavigation/BottomNavigation';
import Button from 'src/components/common/Button/Button';
import withAuth from 'src/hocs/withAuth';
import { useLogoutMutation } from 'src/queries/user';
import styled from 'styled-components';
import { ROUTE } from 'src/constants/route';
import { useLoggedIn } from 'src/contexts/LoggedInContext';

function My() {
  const { setIsLoggedIn } = useLoggedIn();
  const logoutMutation = useLogoutMutation();
  const navigate = useNavigate();

  const onClickLogoutButton = () => {
    logoutMutation.mutate();
    setIsLoggedIn(false);
    navigate(ROUTE.HOME);
  };

  return (
    <Container>
      <Button title="로그아웃" size="full" onClick={onClickLogoutButton} />
      <BottomNavigation />
    </Container>
  );
}

export default withAuth(My);

const Container = styled.div`
  padding: 0 16px;
`;
