import { FC, useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import { ToastStatus, useToastFactory } from 'src/contexts/ToastContext';
import Icon from '../Icon/Icon';

interface Props {
  id: number;
  status: ToastStatus;
  message: string;
  timeout: number;
}

const ToastItem: FC<Props> = ({ id, status, message, timeout }) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const { removeToast } = useToastFactory();

  const [visible, setVisible] = useState(true);

  const fireToast = useCallback(() => {
    removeToast(id);
  }, []);

  useEffect(() => {
    if (visible || !toastRef.current) return;

    const toastWrapper = toastRef.current;
    toastWrapper.addEventListener('animationend', fireToast);
    return () => {
      toastWrapper.removeEventListener('animationend', fireToast);
    };
  }, [toastRef, visible]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <ToastWrapper ref={toastRef} status={status} visible={visible}>
      {message}
      <CursorIcon name="iconCircleClose" onClick={fireToast} />
    </ToastWrapper>
  );
};

export default ToastItem;

const ToastWrapper = styled.div<{ status: ToastStatus; visible: boolean }>`
  ${({ theme }) => theme.fonts.linkSmall};
  padding: 12px 24px;
  width: 100%;
  min-width: 320px;
  height: 47px;

  color: ${({ theme }) => theme.color.white};

  background: rgba(0, 0, 0, 0.6);

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 36px;

  ${({ visible, theme }) =>
    css`
      animation: ${visible ? theme.animation.fadeIn : theme.animation.fadeOut} 0.25s forwards;
    `};
`;

const CursorIcon = styled(Icon)`
  cursor: pointer;
`;
