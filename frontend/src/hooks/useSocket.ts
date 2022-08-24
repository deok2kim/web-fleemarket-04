import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_API_WS_URL + '/chat');

export const useSocket = (roomId: string, eventName?: string) => {
  const disconnectSocket = () => {
    socket.disconnect();
  };

  const sendMessage = <T extends {}>(message: T) => {
    socket.emit(eventName ?? 'event', {
      roomId,
      ...message,
    });
  };

  return { socket, sendMessage, disconnectSocket };
};
