import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { removeAuthorizationHeader } from 'src/api';
import { logout } from 'src/api/auth';
import { addUserRegion, getUserInfo, removeUserRegion } from 'src/api/user';
import { IServerError, IServerResponse } from 'src/types/api';
import { IUserInfo } from 'src/types/user.type';
import { USER } from './queryKey';

export const useUserInfo = (enabled = true) =>
  useQuery<IServerResponse<IUserInfo>, AxiosError<IServerError>>(USER.USER_INFO, getUserInfo, {
    staleTime: Infinity,
    enabled,
  });

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(logout, {
    onSuccess: () => {
      queryClient.clear();
      removeAuthorizationHeader();
    },
  });
};

export const useAddRegionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((regionId: number) => addUserRegion(regionId), {
    onSuccess: () => {
      queryClient.invalidateQueries(USER.USER_INFO);
    },
  });
};

export const useRemoveRegionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((regionId: number) => removeUserRegion(regionId), {
    onSuccess: () => {
      queryClient.invalidateQueries(USER.USER_INFO);
    },
  });
};
