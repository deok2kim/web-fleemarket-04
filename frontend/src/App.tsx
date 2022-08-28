import { useEffect, useLayoutEffect } from 'react';
import { initAxiosConfig } from './api';
import { useUserCheck } from './hooks/useUserCheck';
import Router from './Router';

function App() {
  const { isPassing } = useUserCheck();

  const handleResize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    initAxiosConfig();
  }, []);

  if (isPassing) return null;

  return <Router />;
}

export default App;
