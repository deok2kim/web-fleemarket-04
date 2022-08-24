import { FC, createContext, useContext, useMemo, useRef, useState, useEffect } from 'react';

export type ToastStatus = 'success' | 'error';

interface ToastType {
  id: number;
  message: string;
  status: ToastStatus;
  timeout: number;
}

interface ToastOptionType {
  timeout?: number;
}

const ToastContext = createContext<{ toastList: ToastType[]; removeToast: (id: number) => void; init: boolean }>({
  toastList: [],
  removeToast: () => {},
  init: true,
});
const ToastActionContext = createContext({
  error: (message: string, options?: ToastOptionType) => {},
});

interface Props {
  children: React.ReactNode;
  defaultTimeout?: number;
}

const ToastProvider: FC<Props> = ({ children, defaultTimeout = 2000 }) => {
  const [toastList, setToastList] = useState<ToastType[]>([]);
  const [init, setInit] = useState(true);
  const idRef = useRef(0);

  const addToast = (message: string, status: ToastStatus, options?: ToastOptionType) => {
    const toastId = idRef.current++;

    const newToast = {
      id: toastId,
      message,
      status,
      timeout: options?.timeout ?? defaultTimeout,
    };

    setToastList((prev) => [newToast, ...prev]);
  };

  const removeToast = (id: number) => {
    setToastList((prev) => prev.filter((item) => item.id !== id));
  };

  const actions = useMemo(
    () => ({
      error: (message: string, options?: ToastOptionType) => addToast(message, 'error', options),
    }),
    [],
  );

  useEffect(() => {
    if (toastList.length > 0) {
      setInit(false);
      return;
    }
    const timer = setTimeout(() => {
      setInit(true);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [toastList]);

  return (
    <ToastActionContext.Provider value={actions}>
      <ToastContext.Provider value={{ toastList, removeToast, init }}>{children}</ToastContext.Provider>
    </ToastActionContext.Provider>
  );
};

export const useToastFactory = () => {
  const value = useContext(ToastContext);

  return { ...value, hasToast: value.toastList.length > 0 };
};

export const useToast = () => {
  const toast = useContext(ToastActionContext);

  return toast;
};

export default ToastProvider;
