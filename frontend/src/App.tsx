import { useEffect, useLayoutEffect } from 'react';
import { initAxiosConfig } from './api';
import { useUserInfo } from './queries/user';
import Router from './Router';

function App() {
  useUserInfo();
  useLayoutEffect(() => {
    initAxiosConfig();
  }, []);

  return <Router />;
}

export default App;
