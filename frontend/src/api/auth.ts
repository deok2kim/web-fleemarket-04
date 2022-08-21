import axios from 'axios';
import { getCookie } from 'src/utils/cookie';

/**
 * 액세스 토큰 재발급 API
 * @description 리프레시 토큰을 이용해 액세스 토큰을 재발급한다.
 **/
export const refreshAccessToken = async () => {
  const refreshToken = getCookie('refreshToken');
  await axios.post(
    '/auth/refresh/access-token',
    {
      refreshToken,
    },
    {
      withCredentials: true,
    },
  );
};
