import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from 'src/queries/user';

export function useCheckRegion(nextPage: string) {
  const { data, isLoading, isError, isFetched } = useUserInfo();
  const [regionTrigger, setRegionTrigger] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      setRegionTrigger(false);
      return;
    }
    if (isLoading) return;
    const hasRegion = !!data?.data.regions.length;
    if (isFetched && !hasRegion) {
      navigate(nextPage, {
        replace: true,
      });
    }
    setRegionTrigger(false);
  }, [isLoading, isFetched]);

  return { isPassing: isLoading || regionTrigger, data, isLoading, isError };
}
