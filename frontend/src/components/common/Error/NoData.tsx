import styled from 'styled-components';
import Icon from '../Icon/Icon';

import * as icons from 'src/components/common/Icon/iconPath';

interface Props {
  message: string;
  iconName: keyof typeof icons;
}

function NoData({ message, iconName }: Props) {
  return (
    <Container>
      <Message>{message}</Message>
      <Icon name={iconName} size={50} fillColor="grey200" />
    </Container>
  );
}

export default NoData;

const Container = styled.div`
  margin-top: -56px;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Message = styled.p`
  color: ${({ theme }) => theme.color.grey200};
  ${({ theme }) => theme.fonts.textMedium}
`;
