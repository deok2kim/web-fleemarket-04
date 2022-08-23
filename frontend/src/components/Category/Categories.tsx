import { useCategories } from 'src/queries/category';
import styled from 'styled-components';
import Category from './Category';

function Categories() {
  const { data, isLoading, isError } = useCategories();

  return (
    <Container>
      {data?.data.categories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
    </Container>
  );
}

export default Categories;

const Container = styled.ul`
  height: 50px;
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
