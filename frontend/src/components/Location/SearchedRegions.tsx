import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegions } from 'src/queries/region';
import { useAddRegionMutation } from 'src/queries/user';
import styled from 'styled-components';
import { ROUTE } from 'src/constants/route';
import { useInfiniteScroll } from 'src/hooks/useInfiniteScroll';
import Spinner from '../common/Loading/Spinner';

interface Props {
  keyword: string;
}

function SearchedRegions({ keyword }: Props) {
  const { data: regionList, isFetching, fetchNextPage, hasNextPage } = useRegions(keyword);
  const addUserRegionMutation = useAddRegionMutation();
  const navigate = useNavigate();
  const observerTarget = useRef<HTMLLIElement>(null);

  useInfiniteScroll({
    targetRef: observerTarget,
    loading: isFetching,
    loadMore: fetchNextPage,
    hasNextPage: hasNextPage ?? false,
  });

  const onClickRegion = (regionId: number) => {
    addUserRegionMutation.mutate(regionId);
    navigate(ROUTE.LOCATION);
  };

  return (
    <Container>
      {regionList?.pages.map((pages) =>
        pages.data.paginationResult.map(({ id, name }) => (
          <Region key={id} ref={observerTarget} onClick={() => onClickRegion(id)}>
            {name}
          </Region>
        )),
      )}
      {isFetching && <Spinner />}
    </Container>
  );
}

export default SearchedRegions;

const Container = styled.ul`
  height: 80vh;

  display: flex;
  flex-direction: column;
  gap: 4px;

  padding: 0 16px;

  overflow-y: scroll;
`;

const Region = styled.li`
  padding: 10px;

  border-bottom: 1px solid ${({ theme }) => theme.color.grey300};

  &:hover {
    background-color: ${({ theme }) => theme.color.offWhite};
  }

  cursor: pointer;
`;
