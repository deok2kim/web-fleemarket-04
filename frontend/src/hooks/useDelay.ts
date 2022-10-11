import { useEffect, useState } from 'react';

export function useDelay() {
  const [isDelay, setIsDelay] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsDelay(false);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, []);

  return isDelay;
}
