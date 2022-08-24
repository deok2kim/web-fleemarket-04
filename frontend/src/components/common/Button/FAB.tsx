import { useToastFactory } from 'src/contexts/ToastContext';
import styled, { css, keyframes } from 'styled-components';
import Icon from '../Icon/Icon';

interface Props {
  disabled?: boolean;
  className?: string;
  onClick: () => void;
}

type TSize = 'md';
type TSizeDetail = 'width' | 'height' | 'borderRadius';

const sizes: Record<TSize, Record<TSizeDetail, string>> = {
  md: {
    width: '56px',
    height: '56px',
    borderRadius: '28px',
  },
};

function FAB({ disabled, onClick, className }: Props) {
  const { hasToast, init } = useToastFactory();

  return (
    <ButtonElement onClick={onClick} disabled={disabled} hasToast={hasToast} init={init}>
      <Icon name="iconAdd" strokeColor="white" className={className} />
    </ButtonElement>
  );
}

export default FAB;

const slideUp = keyframes`
  from {
    transform : translateY(0);
  } to {
    transform: translateY(-47px);
  }
`;

const slideDown = keyframes`
  from {
    transform : translateY(-47px);
  } to {
    transform: translateY(0);
  }
`;

const ButtonElement = styled.button<{ hasToast: boolean; init: boolean }>`
  position: absolute;
  bottom: 90px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ init, hasToast }) =>
    !init &&
    css`
      animation: ${hasToast ? slideUp : slideDown} 0.4s forwards;
    `}

  z-index: ${({ theme }) => theme.zIndex.fab};

  background: ${({ theme }) => theme.color.primary200};
  color: ${({ theme }) => theme.color.white};

  &:hover {
    background: ${({ theme }) => theme.color.primary300};
  }
  &:active {
    border: 2px solid ${({ theme }) => theme.color.primary100};
    background: ${({ theme }) => theme.color.primary200};
  }
  &:disabled {
    background: ${({ theme }) => theme.color.primary100};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  ${sizes.md}
  cursor: pointer;
`;
