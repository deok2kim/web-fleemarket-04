import axios from 'axios';
import { IServerResponse } from 'src/types/api';
import { IChatRoom, ChatRoomResult, ChatRoomsResult } from 'src/types/chatRoom';

/**
 * 로그인한 유저의 채팅 목록 API
 * @description 해당 유저의 채팅 목록을 불러옵니다.
 **/
export const getChatRooms = async (): Promise<IServerResponse<ChatRoomsResult>> => {
  const { data } = await axios.get('/chatRoom');
  return data;
};

/**
 * 채팅방 하나 API
 * @description 해당 유저의 채팅방 하나를 불러옵니다.
 **/
export const getChatRoom = async (chatRoomId: string): Promise<IServerResponse<ChatRoomResult>> => {
  const { data } = await axios.get(`/chatRoom/${chatRoomId}`);
  return data;
};

/**
 * 채팅방 나가기(or 지우기)
 * @description 유저가 해당 채팅방을 나갑니다.
 **/
export const deleteChatRoom = async (chatRoomId: string) => {
  await axios.delete(`chatRoom/${chatRoomId}`);
};
