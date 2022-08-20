import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { getUserInfo, IUserInfo } from 'src/api/user';
import { IServerError, IServerResponse } from 'src/types/api';
import { USER } from './queryKey';

export const useUserInfo = () =>
  useQuery<IServerResponse<IUserInfo>, AxiosError<IServerError>>(USER.USER_INFO, getUserInfo, {
    staleTime: Infinity,
  });
