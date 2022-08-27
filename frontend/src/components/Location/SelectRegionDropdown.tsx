import { Link, useNavigate } from 'react-router-dom';
import { ROUTE } from 'src/constants/route';
import { useChangePrimaryRegionMutation } from 'src/queries/user';
import { IRegion } from 'src/types/region.type';
import { getTownName } from 'src/utils/region';
import styled from 'styled-components';
import Dropdown from '../common/Dropdown/Dropdown';
import Icon from '../common/Icon/Icon';

interface Props {
  regions?: IRegion[];
}

function SelectRegionDropdown({ regions }: Props) {
  const location = getTownName(regions?.find((region) => region.isPrimary)?.name) || '전체';
  const changePrimaryRegionMutation = useChangePrimaryRegionMutation();

  const onClickRegion = (region: IRegion) => {
    if (region.isPrimary) {
      return;
    }

    changePrimaryRegionMutation.mutate(region.id, {});
  };

  return (
    <Dropdown>
      <Dropdown.Toggle>
        <IconWrapper>
          <Icon name="iconMapPin" strokeColor="white" />
          <p>{location}</p>
        </IconWrapper>
      </Dropdown.Toggle>

      <Dropdown.List position="center">
        {regions?.map((region) => (
          <Dropdown.Item key={region.id} onClick={() => onClickRegion(region)}>
            <DropdownText isPrimary={region.isPrimary}>{getTownName(region.name)}</DropdownText>
          </Dropdown.Item>
        ))}
        <Dropdown.Item>
          <Link to={ROUTE.LOCATION}>
            <DropdownText>내 동네 설정하기</DropdownText>
          </Link>
        </Dropdown.Item>
      </Dropdown.List>
    </Dropdown>
  );
}

export default SelectRegionDropdown;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const DropdownText = styled.p<{ isPrimary?: boolean }>`
  color: ${({ theme, isPrimary }) => (isPrimary ? theme.color.primary200 : theme.color.black)};
  text-align: left;
`;
