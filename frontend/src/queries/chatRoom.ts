import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions, useQueryClient, useMutation } from 'react-query';
import { deleteChatRoom, getChatRoom, getChatRooms } from 'src/api/chatRoom';
import { IServerResponse, IServerError } from 'src/types/api';
import { IChatRoomRes, IChatRooms } from 'src/types/chatRoom';
import { CHAT } from './queryKey';

export const useChatRooms = (options?: UseQueryOptions<IServerResponse<IChatRooms>, AxiosError<IServerError>>) =>
  useQuery<IServerResponse<IChatRooms>, AxiosError<IServerError>>(CHAT.CHATROOMS, getChatRooms, options);

export const useChatRoomQuery = (
  chatRoomId: string,
  options?: UseQueryOptions<IServerResponse<IChatRoomRes>, AxiosError<IServerError>>,
) => {
  return useQuery<IServerResponse<IChatRoomRes>, AxiosError<IServerError>>(
    CHAT.CHATROOM(chatRoomId),
    () => getChatRoom(chatRoomId),
    options,
  );
};

export const useDeleteChatRoomMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteChatRoom, {
    onSuccess: () => {
      queryClient.invalidateQueries(CHAT.CHATROOMS);
    },
  });
};
