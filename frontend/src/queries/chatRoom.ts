import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { getChatRooms } from 'src/api/chatRoom';
import { IServerResponse, IServerError } from 'src/types/api';
import { IChatRooms } from 'src/types/chatRoom';
import { CHAT } from './queryKey';

export const useChatRooms = () =>
  useQuery<IServerResponse<IChatRooms>, AxiosError<IServerError>>(CHAT.CHATROOMS(), getChatRooms);
