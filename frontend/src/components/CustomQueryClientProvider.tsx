import { PropsWithChildren, useCallback, useRef } from 'react';
import axios, { AxiosError } from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from 'src/contexts/ToastContext';
import { IServerError } from 'src/types/api';

function CustomQueryClientProvider({ children }: PropsWithChildren) {
  const toast = useToast();
  const navigate = useNavigate();

  const handleQueryError = useCallback((error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error?.response?.status as number;

      if (400 <= status && status < 500) {
        const code = (error as AxiosError<IServerError>)?.response?.data.code;
        switch (code) {
          case 1006:
            toast.error('존재하지 않는 상품입니다. 😢');
            navigate('/');
            break;
          default:
            break;
        }
      }

      if (500 <= status) {
        toast.error('예상치 못한 오류가 발생했습니다 😢');
        navigate('/');
      }
    }
    return;
  }, []);

  const queryClientRef = useRef<QueryClient>(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
          onError: handleQueryError,
        },
      },
    }),
  );

  return <QueryClientProvider client={queryClientRef.current}>{children}</QueryClientProvider>;
}

export default CustomQueryClientProvider;
