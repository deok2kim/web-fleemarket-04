import { useCategoriesQuery } from 'src/queries/category';
import styled from 'styled-components';
import Category from './Category';

interface Props {
  selectedCategory: number;
  onChangeCategory: (categoryId: number) => void;
  isPost?: boolean;
}

function Categories({ isPost, selectedCategory, onChangeCategory }: Props) {
  const { data: categoryList } = useCategoriesQuery();

  return (
    <Container>
      {!isPost && (
        <Category
          category={{ id: 0, name: '전체' }}
          selectedCategory={selectedCategory}
          onChangeCategory={onChangeCategory}
        />
      )}
      {categoryList?.data.categories.map((category) => (
        <Category
          key={category.id}
          category={category}
          selectedCategory={selectedCategory}
          onChangeCategory={onChangeCategory}
        />
      ))}
    </Container>
  );
}

export default Categories;

const Container = styled.ul`
  padding: 8px;
  height: 50px;
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
