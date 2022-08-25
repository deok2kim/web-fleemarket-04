import axios from 'axios';
import { IServerResponse } from 'src/types/api';
import { IChatRoom, IChatRoomRes, IChatRooms } from 'src/types/chatRoom';

/**
 * 로그인한 유저의 채팅 목록 API
 * @description 카테고리 목록을 가져옵니다.
 **/
export const getChatRooms = async (): Promise<IServerResponse<IChatRooms>> => {
  const { data } = await axios.get('/chatRoom');
  return data;
};

/**
 * 채팅방 하나를 API
 * @description 카테고리 목록을 가져옵니다.
 **/
export const getChatRoom = async (chatRoomId: string): Promise<IServerResponse<IChatRoomRes>> => {
  const { data } = await axios.get(`/chatRoom/${chatRoomId}`);
  return data;
};
