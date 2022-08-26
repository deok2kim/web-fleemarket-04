import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_API_WS_URL + '/woowatechcamp', { transports: ['websocket'] });
export const useSocket = (roomId: string, eventName?: string) => {
  const disconnectSocket = () => {
    socket.disconnect();
  };

  const sendMessage = <T extends {}>(message: T) => {
    socket.emit('woowa', message);
  };

  const connectSocket = () => {
    socket.connect();
  };

  return { socket, sendMessage, disconnectSocket, connectSocket };
};
