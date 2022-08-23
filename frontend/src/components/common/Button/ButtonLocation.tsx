import { theme } from 'src/styles/theme';
import styled from 'styled-components';
import Icon from '../Icon/Icon';

interface Props {
  title?: string;
  status: TStatus;
  className?: string;
  onClick: () => void;
}

type TStatus = 'add' | 'active' | 'inactive';
type TStatusDetail = 'background-color' | 'color';

const statusList: Record<TStatus, Record<TStatusDetail, string>> = {
  add: {
    'background-color': theme.color.white,
    color: theme.color.primary200,
  },
  active: {
    'background-color': theme.color.primary200,
    color: theme.color.white,
  },
  inactive: {
    'background-color': theme.color.white,
    color: theme.color.primary200,
  },
};

function ButtonLocation({ title, className, status, onClick }: Props) {
  const isAdd = status === 'add';
  return (
    <ButtonElement onClick={onClick} status={status}>
      {isAdd ? (
        <Icon name="iconAdd" strokeColor="primary100" className={className} />
      ) : (
        <>
          <Title>{title}</Title>
          <Icon name="iconClose" strokeColor="primary100" className={className} />
        </>
      )}
    </ButtonElement>
  );
}

export default ButtonLocation;

const ButtonElement = styled.button<Pick<Props, 'status'>>`
  width: 136px;
  height: 36px;

  padding: 6px 16px;

  border: 1px solid ${({ theme }) => theme.color.primary200};
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ status }) => statusList[status]}
`;

const Title = styled.p`
  width: 100%;
  height: 24px;

  display: flex;
  align-items: center;

  ${({ theme }) => theme.fonts.linkSmall}
`;
