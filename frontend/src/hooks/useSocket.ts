import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = (chatRoomId: string) => {
  const socketRef = useRef<Socket>();

  const disconnectSocket = () => {
    socketRef.current?.disconnect();
  };

  const sendMessage = <T extends {}>(message: T) => {
    socketRef.current?.emit('woowa', message);
  };

  const connectSocket = () => {
    socketRef.current?.connect();
  };

  useEffect(() => {
    if (socketRef.current) return;
    socketRef.current = io(process.env.REACT_APP_API_WS_URL + '/woowatechcamp', {
      transports: ['websocket'],
      query: { chatRoomId },
    });

    return () => disconnectSocket();
  }, []);

  return { socket: socketRef.current, sendMessage, disconnectSocket, connectSocket };
};
