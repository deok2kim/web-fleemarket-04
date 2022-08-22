import ButtonLocation from 'src/components/common/Button/ButtonLocation';
import Header from 'src/components/common/Header/Header';
import Icon from 'src/components/common/Icon/Icon';
import styled from 'styled-components';

function Location() {
  return (
    <Container>
      <Header
        headerTheme="offWhite"
        left={<Icon name="iconChevronLeft" strokeColor="black" />}
        center={<p>내 동네 설정하기</p>}
        right={<Icon name="iconClose" strokeColor="offWhite" />}
      />
      <Info>
        <Content>지역은 최소 1개 이상 </Content>
        <Content>최대 2개까지 설정 가능해요. </Content>
      </Info>
      <MyRegions>
        <ButtonLocation title="역삼동" status="active" onClick={() => {}} />
        <ButtonLocation status="add" onClick={() => {}} />
      </MyRegions>
      <MyRegionMap></MyRegionMap>
    </Container>
  );
}

export default Location;

const Container = styled.div``;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 24px auto;
`;

const Content = styled.p`
  ${({ theme }) => theme.fonts.textSmall}
  color: ${({ theme }) => theme.color.grey100}
`;
const MyRegions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
const MyRegionMap = styled.div``;
