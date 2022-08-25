import axios from 'axios';
import { getCookie } from 'src/utils/cookie';

/**
 * 액세스 토큰 재발급 API
 * @description 리프레시 토큰을 이용해 액세스 토큰을 재발급한다.
 **/
export const refreshAccessToken = async () => {
  await axios.post(
    '/auth/refresh/access-token',
    {},
    {
      withCredentials: true,
    },
  );
};

/**
 * 로그아웃 API
 * @description 쿠키의 액세스토큰,리프레시토큰을 삭제한다.
 **/
export const logout = async () => {
  await axios.post('/auth/logout', null, {
    withCredentials: true,
  });
};
