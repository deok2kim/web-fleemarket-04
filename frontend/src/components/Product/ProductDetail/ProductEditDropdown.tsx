import { useNavigate } from 'react-router-dom';
import { ROUTE } from 'src/constants/route';
import { useModal } from 'src/contexts/ModalContext';
import { useToast } from 'src/contexts/ToastContext';
import { useDeleteProductMutation } from 'src/queries/product';
import styled from 'styled-components';
import Dropdown from '../../common/Dropdown/Dropdown';
import Icon from '../../common/Icon/Icon';

interface Props {
  productId: number;
}

function ProductEditDropdown({ productId }: Props) {
  const deleteProductMutation = useDeleteProductMutation();
  const navigate = useNavigate();
  const toast = useToast();
  const { confirmModal } = useModal();

  const onClickEditButton = () => {
    navigate(`/post/products/${productId}`);
  };

  const onClickDeleteButton = () => {
    confirmModal({
      title: '채팅이 있는 게시글을 삭제하면 거래 상대방이 당황할 수 있어요\n게시글을 정말 삭제하시겠어요?',
      cancelOption: {
        label: '취소',
      },
      submitOption: {
        label: '삭제',
        onClick: () => {
          deleteProductMutation.mutate(productId, {
            onSuccess: () => {
              navigate(ROUTE.SOLD);
              toast.success('해당 상품이 삭제되었습니다.');
            },
          });
        },
      },
    });
  };

  return (
    <Dropdown>
      <Dropdown.Toggle>
        <Icon name="iconKebab" strokeColor="grey200" />
      </Dropdown.Toggle>

      <Dropdown.List position="right" top={24}>
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
