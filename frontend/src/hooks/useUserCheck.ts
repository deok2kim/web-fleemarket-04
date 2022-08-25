import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from 'src/constants/route';
import { useLoggedIn } from 'src/contexts/LoggedInContext';
import { useUserInfo } from 'src/queries/user';

export function useUserCheck(nextPage = ROUTE.LOCATION_INIT) {
  const { setIsLoggedIn } = useLoggedIn();
  const { data: userInfo, isFetched, error } = useUserInfo();
  const navigate = useNavigate();
  const [regionTrigger, setRegionTrigger] = useState(true);

  useEffect(() => {
    if (!isFetched) return;

    if (error) {
      setRegionTrigger(false);
      return;
    }
    setIsLoggedIn(true);
    const hasRegion = !!userInfo?.data.regions.length;

    if (!hasRegion) {
      navigate(nextPage, {
        replace: true,
      });
    }

    setRegionTrigger(false);
  }, [isFetched]);

  return { isPassing: !isFetched || regionTrigger };
}
