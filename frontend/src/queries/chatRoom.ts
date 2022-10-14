import { AxiosError } from 'axios';
import { UseQueryOptions, useQueryClient, useMutation } from 'react-query';
import { deleteChatRoom, getChatRoom, getChatRooms } from 'src/api/chatRoom';
import { IServerResponse, IServerError } from 'src/types/api';
import { ChatRoomResult, ChatRoomsResult } from 'src/types/chatRoom';
import { CHAT } from './queryKey';
import { useSuspendedQuery } from '@toss/react-query';

export const useChatRoomsQuery = (
  options?: UseQueryOptions<IServerResponse<ChatRoomsResult>, AxiosError<IServerError>>,
) => {
  const {
    data: { data },
  } = useSuspendedQuery<IServerResponse<ChatRoomsResult>, AxiosError<IServerError>>(
    CHAT.CHATROOMS,
    getChatRooms,
    options,
  );
  return data;
};

export const useChatRoomQuery = (
  chatRoomId: string,
  options?: UseQueryOptions<IServerResponse<ChatRoomResult>, AxiosError<IServerError>>,
) => {
  const {
    data: { data },
  } = useSuspendedQuery<IServerResponse<ChatRoomResult>, AxiosError<IServerError>>(
    CHAT.CHATROOM(chatRoomId),
    () => getChatRoom(chatRoomId),
    options,
  );
  return data;
};

export const useDeleteChatRoomMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteChatRoom, {
    onSuccess: () => {
      queryClient.invalidateQueries(CHAT.CHATROOMS);
    },
  });
};
