import BottomNavigation from 'src/components/common/BottomNavigation/BottomNavigation';
import withAuth from 'src/hocs/withAuth';
import { useSocket } from 'src/hooks/useSocket';

function Chat() {
  return (
    <div>
      Chat
      <BottomNavigation />
    </div>
  );
}

export default withAuth(Chat);
