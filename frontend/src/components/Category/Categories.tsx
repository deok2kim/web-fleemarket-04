import { useCategories } from 'src/queries/category';
import styled from 'styled-components';
import Category from './Category';

function Categories() {
  const { data, isLoading, isError } = useCategories();

  if (isLoading) return <div>...Loading</div>;
  if (isError) return <div>...Error</div>;
  if (!data) return <div>...No Data</div>;

  return (
    <Container>
      {data.data.categories.map((category) => (
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
`;
