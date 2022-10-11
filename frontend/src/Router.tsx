import { Routes, Route, Navigate } from 'react-router-dom';
import ChatRoom from './routers/ChatRoom';
import Home from './routers/Home';
import Like from './routers/Like';
import Login from './routers/Login';
import My from './routers/My';
import ProductDetail from './routers/ProductDetail';
import Sold from './routers/Sold';
import Location from './routers/Location';
import LocationSearch from './routers/LocationSearch';
import { ROUTE } from './constants/route';
import Chat from './routers/Chat';
import LocationInit from './routers/LocationInit';
import Post from './routers/Post';
import ProductChatRooms from './routers/ProductChatRooms';
import Error404 from './routers/404';
import { Suspense } from 'react';
import ChatRoomDetailSkeleton from './components/common/Loading/Skeleton/ChatRommDetailSkeleton';

function Router() {
  // TODO: 채팅 컴포넌트 이름 명확하게 수정하기 e.g 채팅목록은 chatRooms, 채팅방은 chatRoom
  return (
    <Routes>
      <Route path={ROUTE.HOME} element={<Home />} />
      <Route path={ROUTE.LOGIN} element={<Login />} />
      <Route path={ROUTE.LIKE} element={<Like />} />
      <Route path={ROUTE.SOLD} element={<Sold />} />
      <Route path={ROUTE.MY} element={<My />} />
      <Route path={ROUTE.LOCATION} element={<Location />} />
      <Route path={ROUTE.LOCATION_SEARCH} element={<LocationSearch />} />
      <Route path={ROUTE.LOCATION_INIT} element={<LocationInit />} />
      <Route path={`${ROUTE.PRODUCTS}/:id`} element={<ProductDetail />} />
      <Route path={`${ROUTE.PRODUCTS_POST}`} element={<Post />} />
      <Route path={`${ROUTE.PRODUCTS_POST}/:id`} element={<Post />} />

      {/* 나의 채팅 목록  */}
      <Route path={ROUTE.CHAT} element={<ChatRoom />} />
      {/* 채팅방 1개 - 실제 채팅을 하는곳 */}
      <Route
        path={`${ROUTE.CHAT}/:chatRoomId`}
        element={
          <Suspense fallback={<ChatRoomDetailSkeleton />}>
            <Chat />
          </Suspense>
        }
      />
      {/* 내가 판매하는 해당 상품의 채팅 목록  */}
      <Route path={'/products/:productId/chat-rooms'} element={<ProductChatRooms />} />

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default Router;
