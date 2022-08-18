import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routers/Home';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
