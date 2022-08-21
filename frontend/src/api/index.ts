import axios from 'axios';
import { getCookie } from 'src/utils/cookie';
import { refreshAccessToken } from './auth';

export const initAxiosConfig = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
  axios.defaults.timeout = 3000;
  const accessToken = getCookie('accessToken');
  if (accessToken) {
    axios.defaults.headers.common['Authorization'] = accessToken;
  }

  axios.interceptors.response.use(
    (res) => res,
    async (error) => {
      const {
        config,
        response: { status },
      } = error;

      // HTTP ERROR: UNAUTHORIZED & GONE
      if (status === 410 || status === 401) {
        const originalReq = config;
        await refreshAccessToken();
        const newAccessToken = getCookie('accessToken');
        if (newAccessToken) {
          originalReq.headers.Authentication = newAccessToken;
          axios.defaults.headers.common['Authorization'] = newAccessToken;
          return axios(originalReq);
        }

        return Promise.reject(error);
      }

      return Promise.reject(error);
    },
  );
};
