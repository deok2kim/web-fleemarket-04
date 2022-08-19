import styled from 'styled-components';

interface Props {
  title: string;
  size: TSize;
  disabled?: boolean;
  className?: string;
  onClick: () => void;
}

type TSize = 'md' | 'lg';
type TSizeDetail = 'width' | 'height';

const sizes: Record<TSize, Record<TSizeDetail, string>> = {
  lg: {
    width: '136px',
    height: '36px',
  },
  md: {
    width: '290px',
    height: '42px',
  },
};

function Button({ title, size, disabled, onClick }: Props) {
  return (
    <ButtonElement onClick={onClick} size={size} disabled={disabled}>
      {title}
    </ButtonElement>
  );
}

export default Button;

const ButtonElement = styled.button<Pick<Props, 'size'>>`
  background: ${(props) => props.theme.color.primary200};
  border-radius: 8px;
  color: ${(props) => props.theme.color.white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:hover {
    background: ${(props) => props.theme.color.primary300};
    border: none;
  }
  &:active {
    border: 2px solid ${(props) => props.theme.color.primary100};
    background: ${(props) => props.theme.color.primary200};
  }
  &:disabled {
    background: ${(props) => props.theme.color.primary100};
    border-radius: 8px;
    border: none;
  }

  ${(props) => sizes[props.size]}
  cursor: pointer;
`;
