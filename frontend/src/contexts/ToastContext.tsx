import { FC, createContext, useContext, useMemo, useRef, useState, useEffect } from 'react';

export type TToastStatus = 'success' | 'error';

export interface IToast {
  id: number;
  message: string;
  status: TToastStatus;
  timeout: number;
  onClick?: () => void;
}

interface ToastOptionType {
  timeout?: number;
  onClick?: () => void;
}

const ToastContext = createContext<{ toastList: IToast[]; removeToast: (id: number) => void; init: boolean }>({
  toastList: [],
  removeToast: () => {},
  init: true,
});
const ToastActionContext = createContext({
  success: (message: string, options?: ToastOptionType) => {},
  error: (message: string, options?: ToastOptionType) => {},
});

interface Props {
  children: React.ReactNode;
  defaultTimeout?: number;
}

const ToastProvider: FC<Props> = ({ children, defaultTimeout = 2000 }) => {
  const [toastList, setToastList] = useState<IToast[]>([]);
  const [init, setInit] = useState(true);
  const idRef = useRef(0);

  const addToast = (message: string, status: TToastStatus, options?: ToastOptionType) => {
    const toastId = idRef.current++;

    const newToast = {
      id: toastId,
      message,
      status,
      timeout: options?.timeout ?? defaultTimeout,
      onClick: options?.onClick,
    };

    setToastList((prev) => [newToast, ...prev]);
  };

  const removeToast = (id: number) => {
    setToastList((prev) => prev.filter((item) => item.id !== id));
  };

  const actions = useMemo(
    () => ({
      success: (message: string, options?: ToastOptionType) => addToast(message, 'success', options),
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
