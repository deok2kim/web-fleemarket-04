import styled from 'styled-components';
import Dropdown from '../common/Dropdown/Dropdown';
import Icon from '../common/Icon/Icon';

interface Props {
  currentStatus: string;
}

function ProductStatusDropdown({ currentStatus }: Props) {
  return (
    <Dropdown>
      <Dropdown.Toggle>
        <ProductStatusDropdownToggle>
          {currentStatus}
          <Icon name="iconChevronDown" size={16} />
        </ProductStatusDropdownToggle>
      </Dropdown.Toggle>

      <Dropdown.List position="left">
        {currentStatus !== '판매중' && <Dropdown.Item>판매중으로 변경</Dropdown.Item>}
        {currentStatus !== '예약중' && <Dropdown.Item>예약중으로 변경</Dropdown.Item>}
        {currentStatus !== '판매완료' && <Dropdown.Item>판매완료로 변경</Dropdown.Item>}
      </Dropdown.List>
    </Dropdown>
  );
}

export default ProductStatusDropdown;

const ProductStatusDropdownToggle = styled.div`
  ${({ theme }) => theme.fonts.linkSmall};
  padding: 10px 16px;
  width: fit-content;

  display: flex;
  gap: 8px;

  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;
