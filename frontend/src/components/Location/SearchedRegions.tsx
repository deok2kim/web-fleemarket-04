import styled from 'styled-components';

function SearchedRegions() {
  const searchedRegions = [
    {
      id: 1,
      name: '서울 강남구 역삼동',
    },
    {
      id: 2,
      name: '서울 송파구 잠실동',
    },
    {
      id: 3,
      name: '서울 서초구 서초동',
    },
    {
      id: 4,
      name: '서울 관악구 관악동',
    },
  ];
  return (
    <Container>
      {searchedRegions.map((region) => (
        <Region key={region.id}>{region.name}</Region>
      ))}
    </Container>
  );
}

export default SearchedRegions;

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;

  padding: 0 16px;
`;

const Region = styled.li`
  padding: 10px;

  border-bottom: 1px solid ${({ theme }) => theme.color.grey300};
`;
