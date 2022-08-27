import { useNavigate } from 'react-router-dom';
import { useToast } from 'src/contexts/ToastContext';
import { useDeleteProductMutation } from 'src/queries/product';
import { IProduct } from 'src/types/product.type';
import styled from 'styled-components';
import Dropdown from '../../common/Dropdown/Dropdown';
import Icon from '../../common/Icon/Icon';

interface Props {
  product: IProduct;
}

function ProductEditDropdown({ product }: Props) {
  const deleteProductMutation = useDeleteProductMutation();
  const navigate = useNavigate();
  const toast = useToast();

  const onClickEditButton = () => {
    navigate(`/post/products/${product.id}`);
  };

  const onClickDeleteButton = () => {
    deleteProductMutation.mutate(product.id, {
      onSuccess: () => {
        navigate('/');
        toast.success('해당 상품이 삭제되었습니다.');
      },
    });
  };

  return (
    <Dropdown>
      <Dropdown.Toggle>
        <Icon name="iconKebab" strokeColor="white" />
      </Dropdown.Toggle>

      <Dropdown.List position="right">
        <Dropdown.Item onClick={onClickEditButton}>수정하기</Dropdown.Item>
        <Dropdown.Item onClick={onClickDeleteButton}>
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
