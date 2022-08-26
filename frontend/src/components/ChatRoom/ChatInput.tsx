import React from 'react';
import styled from 'styled-components';
import Icon from '../common/Icon/Icon';

interface Props {
  message: string;
  onChangeMessage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSubmit: () => void;
}

function ChatInput({ message, onChangeMessage, onClickSubmit }: Props) {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClickSubmit();
  };

  const isInputText = !!message.trim();
  return (
    <Container onSubmit={onSubmit}>
      <Input placeholder="메세지를 입력하세요." value={message} onChange={onChangeMessage} />
      <button>
        <Icon name="iconSend" strokeColor={isInputText ? 'primary200' : 'grey100'} onClick={onClickSubmit} />
      </button>
    </Container>
  );
}

export default ChatInput;

const Container = styled.form`
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

  padding: 14px;

  form {
    width: 100%;
  }
`;

const Input = styled.input`
  width: 85%;
  height: 36px;
  border-radius: 8px;
  outline: none;
  border: 1px solid ${({ theme }) => theme.color.grey300}; ;
`;
