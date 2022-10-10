import withAuth from 'src/hocs/withAuth';

import Header from 'src/components/common/Header/Header';
import ChatRoomList from 'src/components/Chatting/ChatRoomList';
import BottomNavigation from 'src/components/common/BottomNavigation/BottomNavigation';

function ChatRoom() {
  return (
    <>
      <Header headerTheme="offWhite" center={<p>채팅</p>} />
      <ChatRoomList />
      <BottomNavigation />
    </>
  );
}

export default withAuth(ChatRoom);
