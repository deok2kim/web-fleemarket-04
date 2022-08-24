import { RefObject, useCallback, useEffect } from 'react';

interface Props {
  rootMargin?: string;
  threshold?: number;
  loading: boolean;
  hasNextPage: boolean;
  targetRef: RefObject<HTMLElement>;
  loadMore: () => Promise<any>;
}

export function useInfiniteScroll({
  rootMargin = '0px',
  threshold = 0,
  hasNextPage,
  loading,
  targetRef,
  loadMore,
}: Props) {
  useEffect(() => {
    if (loading) return;

    const onIntersect: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage) {
          observer.unobserve(entry.target);
          loadMore();
        }
      });
    };

    let observer: IntersectionObserver;
    if (targetRef.current) {
      observer = new IntersectionObserver(onIntersect, { rootMargin, threshold });
      observer.observe(targetRef.current as Element);
    }
    return () => observer && observer.disconnect();
  }, [loading]);
}
