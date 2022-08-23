import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function Router() {
  return (
    <Routes>
      <Route path={ROUTE.HOME} element={<Home />} />
      <Route path={ROUTE.LOGIN} element={<Login />} />
      <Route path={ROUTE.LIKE} element={<Like />} />
      <Route path={ROUTE.SOLD} element={<Sold />} />
      <Route path={ROUTE.CHAT} element={<Chat />} />
      <Route path={ROUTE.MY} element={<My />} />

      <Route path={ROUTE.LOCATION} element={<Location />} />
      <Route path={ROUTE.LIKE} element={<LocationSearch />} />
      <Route path="/products/:id" element={<ProductDetail />} />
    </Routes>
  );
}

export default Router;
