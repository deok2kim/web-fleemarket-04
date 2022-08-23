import { Link, useLocation } from 'react-router-dom';
import { ROUTE } from 'src/constants/route';
import styled from 'styled-components';
import Icon from '../Icon/Icon';

function BottomNavigation() {
  const pathname = useLocation().pathname;
  const isHome = pathname === ROUTE.HOME;
  const isLike = pathname === ROUTE.LIKE;
  const isSold = pathname === ROUTE.SOLD;
  const isChat = pathname === ROUTE.CHAT;
  const isMy = pathname === ROUTE.MY;

  return (
    <Container>
      <Menu to={ROUTE.HOME}>
        <Icon name={isHome ? 'iconHomeFill' : 'iconHomeLine'} />홈
      </Menu>
      <Menu to={ROUTE.LIKE}>
        <Icon name={isLike ? 'iconHeartFill' : 'iconHeartLine'} />찜
      </Menu>
      <Menu to={ROUTE.SOLD}>
        <Icon name={isSold ? 'iconCalculatorFill' : 'iconCalculatorLine'} />
        판매목록
      </Menu>
      <Menu to={ROUTE.CHAT}>
        <Icon name={isChat ? 'iconChatFill' : 'iconChatLine'} />
        채팅
      </Menu>
      <Menu to={ROUTE.MY}>
        <Icon name={isMy ? 'iconUserFill' : 'iconUserLine'} />
        나의공간
      </Menu>
    </Container>
  );
}

export default BottomNavigation;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 74px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-top: 1px solid ${({ theme }) => theme.color.grey300};
  background-color: ${({ theme }) => theme.color.white};
`;

const Menu = styled(Link)`
  ${({ theme }) => theme.fonts.linkSmall}

  display: flex;
  flex-direction: column;
  align-items: center;

  flex: 1;
`;
