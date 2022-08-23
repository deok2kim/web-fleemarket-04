import styled from 'styled-components';

interface Props {
  title: string;
  size: TSize;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

type TSize = 'md' | 'lg' | 'full';
type TSizeDetail = 'width' | 'height';

const sizes: Record<TSize, Record<TSizeDetail, string>> = {
  md: {
    width: '136px',
    height: '36px',
  },
  lg: {
    width: '290px',
    height: '42px',
  },
  full: {
    width: '100%',
    height: '42px',
  },
};

function Button({ title, size, disabled, className, onClick }: Props) {
  return (
    <ButtonElement onClick={onClick} size={size} disabled={disabled} className={className}>
      {title}
    </ButtonElement>
  );
}

export default Button;

const ButtonElement = styled.button<Pick<Props, 'size'>>`
  background: ${({ theme }) => theme.color.primary200};
  border-radius: 8px;
  color: ${({ theme }) => theme.color.white};
  &:hover {
    background: ${({ theme }) => theme.color.primary300};
    border: none;
  }
  &:active {
    border: 2px solid ${({ theme }) => theme.color.primary100};
    background: ${({ theme }) => theme.color.primary200};
  }
  &:disabled {
    background: ${({ theme }) => theme.color.primary100};
    border-radius: 8px;
    border: none;
  }

  ${({ size }) => sizes[size]}
  cursor: pointer;
`;
