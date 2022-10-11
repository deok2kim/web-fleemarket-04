import { Suspense } from 'react';

import withAuth from 'src/hocs/withAuth';

import Header from 'src/components/common/Header/Header';
import ChatRoomList from 'src/components/Chatting/ChatRoomList';
import BottomNavigation from 'src/components/common/BottomNavigation/BottomNavigation';

import ChatRoomListSkeleton from 'src/components/common/Loading/Skeleton/ChatRoomListSkeleton';

function ChatRoom() {
  return (
    <>
      <Header headerTheme="offWhite" center={<p>채팅</p>} />
      <Suspense fallback={<ChatRoomListSkeleton />}>
        <ChatRoomList />
      </Suspense>
      <BottomNavigation />
    </>
  );
}

export default withAuth(ChatRoom);
