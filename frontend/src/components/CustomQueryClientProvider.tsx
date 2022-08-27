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
        // TODO Type
        const errorResponse = error?.response?.data as IServerError;
        const code = errorResponse.code;
        const message = errorResponse.message;

        switch (code) {
          case 1000:
            break;
          case 1001:
            toast.error(message);
            break;
          case 1002:
            break;
          case 1003:
            toast.error(message);
            break;
          case 1004:
            break;
          case 1005:
            break;
          case 1006:
            toast.error(message);
            navigate('/');
            break;
          case 1007:
            break;
          case 1008:
            break;
          case 1009:
            break;
          case 1010:
            toast.error(message);
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
        mutations: {
          onError: handleQueryError,
        },
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
