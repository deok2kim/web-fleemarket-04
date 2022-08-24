import styled from 'styled-components';
import Icon from '../common/Icon/Icon';

function ChatInput() {
  return (
    <Container>
      <Input placeholder="메세지를 입력하세요." />
      <Icon name="iconSend" strokeColor="grey100" />
    </Container>
  );
}

export default ChatInput;

const Container = styled.div`
  position: fixed;
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

  padding: 14px;
`;

const Input = styled.input`
  width: 85%;
  height: 36px;
  border-radius: 8px;
  outline: none;
  border: 1px solid ${({ theme }) => theme.color.grey300}; ;
`;
