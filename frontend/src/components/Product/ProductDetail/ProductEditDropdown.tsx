import { useNavigate } from 'react-router-dom';
import { IProduct } from 'src/types/product.type';
import styled from 'styled-components';
import Dropdown from '../../common/Dropdown/Dropdown';
import Icon from '../../common/Icon/Icon';

interface Props {
  product: IProduct;
}

function ProductEditDropdown({ product }: Props) {
  const navigate = useNavigate();

  const onClickEditButton = () => {
    navigate(`/post/products/${product.id}`);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle>
        <Icon name="iconKebab" strokeColor="white" />
      </Dropdown.Toggle>

      <Dropdown.List position="right">
        <Dropdown.Item onClick={onClickEditButton}>수정하기</Dropdown.Item>
        <Dropdown.Item>
          <DeleteText>삭제하기</DeleteText>
        </Dropdown.Item>
      </Dropdown.List>
    </Dropdown>
  );
}

export default ProductEditDropdown;

const DeleteText = styled.span`
  color: ${({ theme }) => theme.color.red};
`;
