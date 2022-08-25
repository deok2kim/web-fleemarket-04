import { useCategories } from 'src/queries/category';
import styled from 'styled-components';
import Category from './Category';

function Categories() {
  const { data: categoryList } = useCategories();

  return (
    <Container>
      <Category category={{ id: 0, name: '전체' }} />
      {categoryList?.data.categories.map((category) => (
        <Category key={category.id} category={category} />
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
