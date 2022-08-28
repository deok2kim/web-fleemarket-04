import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchedRegions from 'src/components/Location/SearchedRegions';
import Button from 'src/components/common/Button/Button';
import Header from 'src/components/common/Header/Header';
import Icon from 'src/components/common/Icon/Icon';
import withAuth from 'src/hocs/withAuth';
import styled from 'styled-components';
import { ROUTE } from 'src/constants/route';

function LocationSearch() {
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const state = useLocation().state as { isInitUser?: boolean };

  // TODO: 디바운스 적용하기
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const onClickBack = () => {
    navigate(ROUTE.LOCATION);
  };

  return (
    <Container>
      <Header
        headerTheme="offWhite"
        left={!state?.isInitUser && <Icon onClick={onClickBack} name="iconChevronLeft" strokeColor="grey100" />}
        center={
          <Center>
            <Icon name="iconSearchMini" strokeColor="grey100" />
            <Input placeholder="동명(읍,면)으로 검색 (ex. 방이동)" onChange={onChange} />
          </Center>
        }
      />

      <Title>검색 결과</Title>
      <SearchedRegions keyword={input} />
    </Container>
  );
}

export default withAuth(LocationSearch);

const Container = styled.div`
  animation: ${({ theme }) => theme.animation.fadeIn} 0.5s;
`;

const Center = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  margin-left: 4px;
  padding-bottom: 4px;

  color: ${({ theme }) => theme.color.grey100};

  border-bottom: 1px solid ${({ theme }) => theme.color.grey100};

  ${({ theme }) => theme.fonts.textLarge}
`;

const Input = styled.input`
  ${({ theme }) => theme.fonts.textSmall}
  flex: 1;

  border: none;

  background-color: ${({ theme }) => theme.color.offWhite};

  &:focus {
    outline: none;
  }
`;

const Title = styled.p`
  margin-top: 20px;
  margin-left: 18px;
  padding: 0 10px 10px 10px;

  ${({ theme }) => theme.fonts.linkMedium}
`;
