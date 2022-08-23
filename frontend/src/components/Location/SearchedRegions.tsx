import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegions } from 'src/queries/region';
import { useAddRegionMutation } from 'src/queries/user';
import styled from 'styled-components';

interface Props {
  keyword: string;
}

function SearchedRegions({ keyword }: Props) {
  const { data, isFetching, fetchNextPage } = useRegions(keyword);
  const addUserRegionMutation = useAddRegionMutation();
  const navigate = useNavigate();
  const observerTarget = useRef<HTMLLIElement>(null);

  const onIntersect: IntersectionObserverCallback = useCallback(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          fetchNextPage();
        }
      });
    },
    [fetchNextPage],
  );

  useEffect(() => {
    if (isFetching) return;
    let observer: IntersectionObserver;
    if (observerTarget.current) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0 });
      observer.observe(observerTarget.current as Element);
    }
    return () => observer && observer.disconnect();
  }, [isFetching, onIntersect]);

  const onClickRegion = (regionId: number) => {
    addUserRegionMutation.mutate(regionId);
    navigate('/location');
    return null;
  };

  return (
    <Container>
      {data?.pages.map((pages) =>
        pages.data.paginationResult.map(({ id, name }) => (
          <Region key={id} ref={observerTarget} onClick={() => onClickRegion(id)}>
            {name}
          </Region>
        )),
      )}
      {isFetching && <p>데이터 로딩중...</p>}
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
