import styled from 'styled-components';
import Category from './Category';

function Categories() {
  const testCategories = [
    {
      id: 1,
      name: '스니커즈',
    },
    {
      id: 2,
      name: '의류',
    },
    {
      id: 3,
      name: '패션잡화',
    },
    {
      id: 4,
      name: '스니커즈',
    },
    {
      id: 5,
      name: '의류',
    },
    {
      id: 6,
      name: '패션잡화3',
    },
    {
      id: 7,
      name: '패션잡화4',
    },
    {
      id: 8,
      name: '의류',
    },
    {
      id: 9,
      name: '패션잡화5',
    },
    {
      id: 10,
      name: '패션잡화200',
    },
  ];
  return (
    <Container>
      {testCategories.map((category) => (
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
