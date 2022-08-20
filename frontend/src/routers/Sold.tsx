import BottomNavigation from 'src/components/common/BottomNavigation/BottomNavigation';
import withAuth from 'src/hocs/withAuth';

function Sold() {
  return (
    <div>
      Sold
      <BottomNavigation />
    </div>
  );
}

export default withAuth(Sold);
