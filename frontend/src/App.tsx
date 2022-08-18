import { useLayoutEffect } from 'react';
import { initAxiosConfig } from './api';
import Router from './Router';

function App() {
  useLayoutEffect(() => {
    initAxiosConfig();
  }, []);
  return <Router />;
}

export default App;
