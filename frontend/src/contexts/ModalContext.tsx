import { createContext, FC, PropsWithChildren, useContext, useRef, useState } from 'react';
import ConfirmModal from 'src/components/common/Modal/Modal';

interface IModalContextProps {
  confirmModal: (params: IConfirmModalParams) => void;
}

interface IConfirmButtonParams {
  label: string;
  onClick?: () => void;
}

export interface IConfirmModalParams {
  title: string;
  cancelOption: IConfirmButtonParams;
  submitOption: IConfirmButtonParams;
}

const ModalContext = createContext<IModalContextProps>({
  confirmModal: () => {},
});

function ModalProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  const onChangeTitle = (newTitle: string) => setTitle(newTitle);
  const cancelOptionRef = useRef<IConfirmButtonParams>({ label: '', onClick: () => {} });
  const submitOptionRef = useRef<IConfirmButtonParams>({ label: '', onClick: () => {} });

  const confirmModal = ({ title, cancelOption, submitOption }: IConfirmModalParams) => {
    onChangeTitle(title);
    cancelOptionRef.current = {
      label: cancelOption.label,
      onClick: () => {
        if (cancelOption.onClick) cancelOption.onClick();
        onClose();
      },
    };
    submitOptionRef.current = {
      label: submitOption.label,
      onClick: () => {
        if (submitOption.onClick) submitOption.onClick();
        onClose();
      },
    };

    onOpen();
  };

  return (
    <ModalContext.Provider value={{ confirmModal }}>
      {children}
      <ConfirmModal
        isOpen={isOpen}
        title={title}
        cancelOption={cancelOptionRef.current}
        submitOption={submitOptionRef.current}
      />
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  return useContext(ModalContext);
};

export default ModalProvider;
