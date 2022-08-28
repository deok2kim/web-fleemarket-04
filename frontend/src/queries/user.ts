import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { removeAuthorizationHeader } from 'src/api';
import { logout } from 'src/api/auth';
import { addUserRegion, changeNickname, changeUserPrimaryRegion, getUserInfo, removeUserRegion } from 'src/api/user';
import { ROUTE } from 'src/constants/route';
import { IServerError, IServerResponse } from 'src/types/api';
import { IUserInfo } from 'src/types/user.type';
import { PRODUCT, USER } from './queryKey';

export const useUserInfo = (enabled = true) =>
  useQuery<IServerResponse<IUserInfo>, AxiosError<IServerError>>(USER.USER_INFO, getUserInfo, {
    staleTime: Infinity,
    enabled,
  });

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(logout, {
    onSuccess: () => {
      queryClient.clear();
      removeAuthorizationHeader();
      navigate(ROUTE.HOME);
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

export const useChangePrimaryRegionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((regionId: number) => changeUserPrimaryRegion(regionId), {
    onSuccess: () => {
      queryClient.invalidateQueries(USER.USER_INFO);
      queryClient.invalidateQueries(PRODUCT.ALL);
    },
  });
};

export const useChangeNicknameMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((nickname: string) => changeNickname(nickname), {
    onSuccess: () => {
      queryClient.invalidateQueries(USER.USER_INFO);
      queryClient.invalidateQueries(PRODUCT.ALL);
    },
  });
};
