import styled from 'styled-components';
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
  return (
    <ButtonElement onClick={onClick} disabled={disabled}>
      <Icon name="iconAdd" strokeColor="white" className={className} />
    </ButtonElement>
  );
}

export default FAB;

const ButtonElement = styled.button`
  position: fixed;
  bottom: 90px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${(props) => props.theme.color.primary200};
  color: ${(props) => props.theme.color.white};

  &:hover {
    background: ${(props) => props.theme.color.primary300};
  }
  &:active {
    border: 2px solid ${(props) => props.theme.color.primary100};
    background: ${(props) => props.theme.color.primary200};
  }
  &:disabled {
    background: ${(props) => props.theme.color.primary100};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  ${sizes.md}
  cursor: pointer;
`;
