import BottomNavigation from 'src/components/common/BottomNavigation/BottomNavigation';
import withAuth from 'src/hocs/withAuth';

function Chat() {
  return (
    <div>
      Chat
      <BottomNavigation />
    </div>
  );
}

export default withAuth(Chat);
