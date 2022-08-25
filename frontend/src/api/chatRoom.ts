import axios from 'axios';
import { IServerResponse } from 'src/types/api';
import { IChatRooms } from 'src/types/chatRoom';

/**
 * 로그인한 유저의 채팅 목록 API
 * @description 카테고리 목록을 가져옵니다.
 **/
export const getChatRooms = async (): Promise<IServerResponse<IChatRooms>> => {
  const { data } = await axios.get('/chatRoom');
  return data;
};
