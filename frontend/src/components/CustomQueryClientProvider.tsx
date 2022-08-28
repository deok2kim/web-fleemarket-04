import { PropsWithChildren, useCallback, useRef } from 'react';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from 'src/contexts/ToastContext';
import { IServerError } from 'src/types/api';
import { ERROR_CODE } from 'src/constants/error-code';

function CustomQueryClientProvider({ children }: PropsWithChildren) {
  const toast = useToast();
  const navigate = useNavigate();

  const handleQueryError = useCallback((error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error?.response?.status as number;

      if (400 <= status && status < 500) {
        const errorResponse = error?.response?.data as IServerError;
        const code = errorResponse.code;
        const message = errorResponse.message;

        switch (code) {
          case ERROR_CODE.ALREADY_LIKE:
          case ERROR_CODE.NOT_LIKED:
            break;
          case ERROR_CODE.EXCEED_REGIONS:
          case ERROR_CODE.DUPLICATE_REGION:
          case ERROR_CODE.NOT_FOUND_REGION:
          case ERROR_CODE.NOT_APPLIED_REGION:
          case ERROR_CODE.CANNOT_REMOVE_ONE_REGION:
          case ERROR_CODE.ALREADY_PRIMARY_REGION:
          case ERROR_CODE.ONLY_DELETE_OWNER:
          case ERROR_CODE.DUPLICATE_NICKNAME:
          case ERROR_CODE.TOO_SHORT_NICKNAME:
            toast.error(message);
            break;
          case ERROR_CODE.NOT_FOUND_PRODUCT:
          case ERROR_CODE.NOT_FOUND_USER:
          case ERROR_CODE.ONLY_EDITABLE_OWNER:
            toast.error(message);
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
