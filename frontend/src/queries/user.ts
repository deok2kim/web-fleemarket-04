import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { removeAuthorizationHeader } from 'src/api';
import { logout } from 'src/api/auth';
import { getUserInfo, IUserInfo } from 'src/api/user';
import { IServerError, IServerResponse } from 'src/types/api';
import { USER } from './queryKey';

export const useUserInfo = () =>
  useQuery<IServerResponse<IUserInfo>, AxiosError<IServerError>>(USER.USER_INFO, getUserInfo, {
    staleTime: Infinity,
  });

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation(logout, {
    onSuccess: () => {
      queryClient.removeQueries(USER.USER_INFO);
      removeAuthorizationHeader();
    },
  });
};
