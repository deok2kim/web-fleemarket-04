import styled from 'styled-components';
import axios from 'axios';
import { useRef } from 'react';

import { useToast } from 'src/contexts/ToastContext';
import { useForm } from 'src/hooks/useForm';
import { useChangeNicknameMutation, useUserInfo } from 'src/queries/user';
import { IServerError } from 'src/types/api';

const NICKNAME_MIN_LENGTH = 2;
const NICKNAME_MAX_LENGTH = 20;

interface User {
  nickname: string;
}

function NicknameForm() {
  const { data: userInfo } = useUserInfo();
  const initNickname = useRef<string>(userInfo?.data.nickname as string);
  const changeNicknameMutation = useChangeNicknameMutation();
  const toast = useToast();

  const onClickChangeButton = () => {
    if (isChanged) return;

    changeNicknameMutation.mutate(nickname, {
      onSuccess: () => {
        toast.success('닉네임이 변경되었습니다. 😄');
        initNickname.current = nickname;
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const { message: errorMessage } = error?.response?.data as IServerError;
          toast.error(errorMessage);
        }
      },
    });
  };

  const {
    handleSubmit,
    handleChange,
    data: { nickname },
    errors,
  } = useForm<User>({
    initialValues: { nickname: userInfo?.data.nickname },
    validations: {
      nickname: {
        pattern: {
          value: '^[a-zA-Z0-9가-힣]*$',
          message: '특수문자는 포함할 수 없습니다.',
        },
        custom: {
          isValid: (value) => value.length > NICKNAME_MIN_LENGTH && value.length <= NICKNAME_MAX_LENGTH,
          message: '닉네임은 2자 이상 20자 이하로 입력해주세요.',
        },
      },
    },
    onSubmit: onClickChangeButton,
  });

  const isChanged = initNickname.current === nickname;

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="nickname-input">닉네임</Label>
      <InputWrapper>
        <Input
          id="nickname-input"
          type="text"
          placeholder="nickName"
          value={nickname || ''}
          onChange={handleChange('nickname')}
        />
        <NicknameButton type="submit" disabled={isChanged}>
          변경
        </NicknameButton>
      </InputWrapper>
      <ErrorMessage>{errors.nickname}</ErrorMessage>
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
