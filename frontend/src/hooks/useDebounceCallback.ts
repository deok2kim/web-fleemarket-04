import { useCallback, useRef } from 'react';

export const useDebouncedCallback = <T extends any[]>(func: (...params: T) => void, wait = 300) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  return useCallback(
    (...args: T) => {
      const later = () => {
        clearTimeout(timeout.current);
        func(...args);
      };

      clearTimeout(timeout.current);
      timeout.current = setTimeout(later, wait);
    },
    [func, wait],
  );
};
