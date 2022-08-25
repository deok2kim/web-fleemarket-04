import { Routes, Route } from 'react-router-dom';
import Chat from './routers/Chat';
import Home from './routers/Home';
import Like from './routers/Like';
import Login from './routers/Login';
import My from './routers/My';
import ProductDetail from './routers/ProductDetail';
import Sold from './routers/Sold';
import Location from './routers/Location';
import LocationSearch from './routers/LocationSearch';
import { ROUTE } from './constants/route';
import ChatRoom from './routers/ChatRoom';
import LocationInit from './routers/LocationInit';
import Post from './routers/Post';

function Router() {
  return (
    <Routes>
      <Route path={ROUTE.HOME} element={<Home />} />
      <Route path={ROUTE.LOGIN} element={<Login />} />
      <Route path={ROUTE.LIKE} element={<Like />} />
      <Route path={ROUTE.SOLD} element={<Sold />} />
      <Route path={ROUTE.CHAT} element={<Chat />} />
      <Route path={`${ROUTE.CHAT}/:chatRoomId`} element={<ChatRoom />} />
      <Route path={ROUTE.MY} element={<My />} />

      <Route path={ROUTE.LOCATION} element={<Location />} />
      <Route path={ROUTE.LOCATION_SEARCH} element={<LocationSearch />} />
      <Route path={ROUTE.LOCATION_INIT} element={<LocationInit />} />

      <Route path={`${ROUTE.PRODUCTS}/:id`} element={<ProductDetail />} />
      <Route path={`${ROUTE.PRODUCTS_POST}`} element={<Post />} />
      <Route path={`${ROUTE.PRODUCTS_POST}/:id`} element={<Post />} />
    </Routes>
  );
}

export default Router;
