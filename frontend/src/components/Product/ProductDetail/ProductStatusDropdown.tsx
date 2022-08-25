import { useToast } from 'src/contexts/ToastContext';
import { useUpdateProductStatusMutation } from 'src/queries/product';
import styled from 'styled-components';
import Dropdown from '../../common/Dropdown/Dropdown';
import Icon from '../../common/Icon/Icon';

interface Props {
  productId: number;
  currentStatus: string;
}

const PRODUCT_STATUS = {
  SALE: 1,
  RESERVED: 2,
  SOLDOUT: 3,
} as const;

function ProductStatusDropdown({ productId, currentStatus }: Props) {
  const updateProductStatusMutation = useUpdateProductStatusMutation();
  const toast = useToast();

  const onClickProductStatus = (productStatusId: number) => {
    updateProductStatusMutation.mutate(
      { productId, productStatusId },
      {
        onSuccess: () => {
          toast.success('해당 상품의 상태가 변경되었습니다.');
        },
      },
    );
  };

  return (
    <Dropdown>
      <Dropdown.Toggle>
        <ProductStatusDropdownToggle>
          {currentStatus}
          <Icon name="iconChevronDown" size={16} />
        </ProductStatusDropdownToggle>
      </Dropdown.Toggle>

      <Dropdown.List position="left">
        {currentStatus !== '판매중' && (
          <Dropdown.Item onClick={() => onClickProductStatus(PRODUCT_STATUS.SALE)}>판매중으로 변경</Dropdown.Item>
        )}
        {currentStatus !== '예약중' && (
          <Dropdown.Item onClick={() => onClickProductStatus(PRODUCT_STATUS.RESERVED)}>예약중으로 변경</Dropdown.Item>
        )}
        {currentStatus !== '판매완료' && (
          <Dropdown.Item onClick={() => onClickProductStatus(PRODUCT_STATUS.SOLDOUT)}>판매완료로 변경</Dropdown.Item>
        )}
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
