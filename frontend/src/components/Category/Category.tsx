import styled from 'styled-components';

interface ICategory {
  id: number;
  name: string;
}
interface Props {
  category: ICategory;
}

interface IContainerProps {
  isActive: boolean;
}

function Category({ category }: Props) {
  const currentCategory = '패션잡화';

  const isActive = () => {
    return category.name === currentCategory;
  };
  return <Container isActive={isActive()}>{category.name}</Container>;
}

export default Category;

const Container = styled.li<IContainerProps>`
  text-align: center;
  width: 70px;
  margin: 10px;
  white-space: nowrap;
  ${({ theme }) => theme.fonts.linkSmall}
  color: ${({ theme, isActive }) => (isActive ? theme.color.black : theme.color.grey100)};
`;
