import { useLayoutEffect } from 'react';
import { initAxiosConfig } from './api';
import { useUserCheck } from './hooks/useUserCheck';
import Router from './Router';

function App() {
  const { isPassing } = useUserCheck();

  useLayoutEffect(() => {
    initAxiosConfig();
  }, []);

  if (isPassing) return null;

  return <Router />;
}

export default App;
