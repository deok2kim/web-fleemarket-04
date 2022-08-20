import BottomNavigation from 'src/components/common/BottomNavigation/BottomNavigation';
import withAuth from 'src/hocs/withAuth';

function My() {
  return (
    <div>
      My
      <BottomNavigation />
    </div>
  );
}

export default withAuth(My);
