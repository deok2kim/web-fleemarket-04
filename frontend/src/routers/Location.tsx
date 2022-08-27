import { useNavigate } from 'react-router-dom';
import ButtonLocation from 'src/components/common/Button/ButtonLocation';
import Header from 'src/components/common/Header/Header';
import Icon from 'src/components/common/Icon/Icon';
import { useToast } from 'src/contexts/ToastContext';
import withAuth from 'src/hocs/withAuth';
import { useRemoveRegionMutation, useUserInfo } from 'src/queries/user';
import { getTownName } from 'src/utils/region';
import styled from 'styled-components';

function Location() {
  const { data, isLoading } = useUserInfo();
  const removeRegionMutation = useRemoveRegionMutation();
  const navigate = useNavigate();
  const toast = useToast();
  const handleClickAddRegion = () => navigate('search');
  const handleClickBack = () => navigate('/');

  const countMyRegion = data?.data.regions.length;

  if (isLoading) return null;
  if (!data) return null;

  const onClickMyRegion = (regionId: number) => {};

  const onClickRemoveIcon = (regionId: number) => {
    if (countMyRegion === 1) {
      toast.error('최소 1개의 지역을 등록해야합니다.');
      return;
    }
    removeRegionMutation.mutate(regionId);
  };

  return (
    <Container>
      <Header
        headerTheme="offWhite"
        left={<Icon name="iconChevronLeft" strokeColor="black" onClick={handleClickBack} />}
        center={<p>내 동네 설정하기</p>}
        right={<Icon name="iconClose" strokeColor="offWhite" />}
      />
      <Info>
        <Content>지역은 최소 1개 이상 </Content>
        <Content>최대 2개까지 설정 가능해요. </Content>
      </Info>
      <MyRegions>
        {data?.data.regions.map(({ id, name }, index) => (
          <ButtonLocation
            key={id}
            title={getTownName(name)}
            status={index === 0 ? 'active' : 'inactive'}
            onClick={() => onClickMyRegion(id)}
            onRemove={() => onClickRemoveIcon(id)}
          />
        ))}
        {countMyRegion === 1 && <ButtonLocation status="add" onClick={handleClickAddRegion} />}
      </MyRegions>
      <MyRegionMap></MyRegionMap>
    </Container>
  );
}

export default withAuth(Location);

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
