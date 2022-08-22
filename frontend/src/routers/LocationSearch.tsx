import SearchedRegions from 'src/components/\bLocation/SearchedRegions';
import Button from 'src/components/common/Button/Button';
import ButtonLocation from 'src/components/common/Button/ButtonLocation';
import Header from 'src/components/common/Header/Header';
import Icon from 'src/components/common/Icon/Icon';
import styled from 'styled-components';

function LocationSearch() {
  return (
    <Container>
      <Header
        headerTheme="offWhite"
        left={<Icon name="iconChevronLeft" strokeColor="black" />}
        center={
          <Center>
            <Icon name="iconSearchMini" strokeColor="grey100" />
            <Input placeholder="동명(읍,면)으로 검색 (ex. 방이동)" />
          </Center>
        }
        right={<Icon name="iconClose" strokeColor="offWhite" />}
      />
      <Info>
        <Button onClick={() => {}} size="full" title="현재 위치로 찾기" />
      </Info>
      <SearchedRegions />
    </Container>
  );
}

export default LocationSearch;

const Container = styled.div``;

const Info = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 0 16px;
  margin: 24px auto;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding-bottom: 4px;

  color: ${({ theme }) => theme.color.grey100};

  border-bottom: 1px solid ${({ theme }) => theme.color.grey100};

  ${({ theme }) => theme.fonts.textLarge}
`;

const Input = styled.input`
  width: 250px;

  border: none;

  background-color: ${({ theme }) => theme.color.offWhite};

  &:focus {
    outline: none;
  }
`;