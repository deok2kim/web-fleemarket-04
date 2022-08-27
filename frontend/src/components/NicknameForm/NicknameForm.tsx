import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useToast } from 'src/contexts/ToastContext';
import { useChangeNicknameMutation, useUserInfo } from 'src/queries/user';
import { IServerError } from 'src/types/api';
import styled from 'styled-components';

const NICKNAME_MIN_LENGTH = 2;
const NICKNAME_MAX_LENGTH = 20;

function NicknameForm() {
  const { data: userInfo } = useUserInfo();
  const [error, setError] = useState('');
  const initNickname = useRef<string>(userInfo?.data.nickname as string);
  const [nickname, setNickname] = useState(initNickname.current || '');
  const changeNicknameMutation = useChangeNicknameMutation();
  const toast = useToast();

  const notChanged = initNickname.current === nickname;

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: nicknameInputValue } = e.target;
    if (nicknameInputValue.length > NICKNAME_MAX_LENGTH) return;

    setNickname(nicknameInputValue);
  };

  const validateNickname = (nickname: string) => {
    if (!nickname.length) {
      setError('닉네임을 입력해주세요.');
      return;
    }

    if (nickname.length < NICKNAME_MIN_LENGTH) {
      setError('닉네임은 2자 이상 입력해주세요.');
      return;
    }

    setError('');
  };

  const onClickChangeButton = () => {
    if (notChanged) return;

    changeNicknameMutation.mutate(nickname, {
      onSuccess: () => {
        toast.success('닉네임이 변경되었습니다. 😄');
        initNickname.current = nickname;
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const { message: errorMessage } = error?.response?.data as IServerError;
          setError(errorMessage);
        }
      },
    });
  };

  useEffect(() => {
    if (!nickname) return;
    validateNickname(nickname);
  }, [nickname]);

  return (
    <Form>
      <Label htmlFor="nickname-input">닉네임</Label>
      <InputWrapper>
        <Input id="nickname-input" type="text" value={nickname} onChange={onChangeNickname} />
        <NicknameButton type="button" onClick={onClickChangeButton} disabled={notChanged}>
          변경
        </NicknameButton>
      </InputWrapper>
      <ErrorMessage>{error}</ErrorMessage>
    </Form>
  );
}

export default NicknameForm;

const Form = styled.form``;

const Label = styled.label`
  margin-left: 4px;
  ${({ theme }) => theme.fonts.linkSmall};
  color: ${({ theme }) => theme.color.titleActive};
`;

const Input = styled.input`
  flex: 1;
  width: 100%;
  height: 42px;
  padding: 8px;
  border-radius: 4px;

  border: 1px solid ${({ theme }) => theme.color.grey100};
  ${({ theme }) => theme.fonts.textSmall};

  &:focus {
    outline: none;
  }
`;

const NicknameButton = styled.button`
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 4px;

  background-color: ${({ theme }) => theme.color.primary200};
  color: ${({ theme }) => theme.color.white};
  ${({ theme }) => theme.fonts.textSmall};

  &:hover {
    background: ${({ theme }) => theme.color.primary300};
    border: none;
  }
  &:active {
    border: 2px solid ${({ theme }) => theme.color.primary100};
    background: ${({ theme }) => theme.color.primary200};
  }
  &:disabled {
    background: ${({ theme }) => theme.color.primary100};
  }
`;

const InputWrapper = styled.div`
  margin-top: 4px;
  display: flex;
  gap: 4px;
`;

const ErrorMessage = styled.p`
  margin-top: 4px;
  height: 16px;
  color: ${({ theme }) => theme.color.red};
  ${({ theme }) => theme.fonts.linkXSmall};
`;
