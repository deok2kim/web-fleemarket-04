import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';

interface IModalContextProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onOk: () => void;
}

interface IModalActionContextProps {
  setTitle: (title: string) => void;
  onOpen: () => void;
  onClose: () => void;
  setOnOk: (cb: () => void) => void;
}

const ModalContext = createContext<IModalContextProps>({
  title: '',
  isOpen: false,
  onClose: () => {},
  onOk: () => {},
});

const ModalActionContext = createContext<IModalActionContextProps>({
  setTitle: (title: string) => {},
  onOpen: () => {},
  onClose: () => {},
  setOnOk: (cb: () => void) => {},
});

// TODO: 화면을 클릭했을 때 모달 닫기
const ModalProvider: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('😄테스트입니다');
  const [onOk, setOnOk] = useState<() => void>(() => {});
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const value = {
    title,
    isOpen,
    onClose,
    onOk,
  };

  const action = {
    setTitle: (title: string) => setTitle(title),
    onOpen,
    onClose,
    setOnOk: (cb: () => void) => setOnOk(() => cb),
  };

  return (
    <ModalActionContext.Provider value={action}>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
    </ModalActionContext.Provider>
  );
};

export const useModalFactory = () => {
  return useContext(ModalContext);
};

export const useModalContext = () => useContext(ModalActionContext);

export default ModalProvider;
