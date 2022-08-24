import BottomNavigation from 'src/components/common/BottomNavigation/BottomNavigation';
import withAuth from 'src/hocs/withAuth';
import { useSocket } from 'src/hooks/useSocket';

function Chat() {
  const { socket, disconnectSocket, sendMessage } = useSocket('1-1-2');

  return (
    <div
      onClick={() =>
        sendMessage({
          roomId: '1-1-2',
          productId: 1,
          buyerId: 2,
          content: 'hello',
        })
      }
    >
      Chat
      <BottomNavigation />
    </div>
  );
}

export default withAuth(Chat);
