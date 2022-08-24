import { useCategory } from 'src/routers/Home';
import { ICategory } from 'src/types/category.type';
import styled, { css } from 'styled-components';

interface Props {
  category: ICategory;
}

interface IContainerProps {
  isActive: boolean;
}

function Category({ category }: Props) {
  const { category: selectedCategory, onChangeCategory } = useCategory();
  const isActive = category.id === selectedCategory;

  const onClickCategoryItem = () => {
    onChangeCategory(category.id);
  };

  return (
    <Container isActive={isActive} onClick={onClickCategoryItem}>
      {category.name}
    </Container>
  );
}

export default Category;

const Container = styled.li<IContainerProps>`
  padding: 4px 16px;

  text-align: center;
  white-space: nowrap;

  cursor: pointer;

  border: 1px solid ${({ theme }) => theme.color.grey300};
  border-radius: 999px;

  ${({ theme }) => theme.fonts.linkSmall};
  ${({ theme, isActive }) =>
    isActive
      ? css`
          background-color: ${theme.color.primary200};
          color: ${theme.color.white};
          border-color: ${theme.color.primary200};
        `
      : css`
          color: ${theme.color.grey100};
        `};
`;
