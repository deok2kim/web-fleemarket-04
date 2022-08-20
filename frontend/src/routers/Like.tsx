import BottomNavigation from 'src/components/common/BottomNavigation/BottomNavigation';
import withAuth from 'src/hocs/withAuth';

function Like() {
  return (
    <div>
      Like
      <BottomNavigation />
    </div>
  );
}

export default withAuth(Like);
