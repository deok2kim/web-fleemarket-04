import styled from 'styled-components';

interface Props {
  size: number;
}

const Spacing = styled.div<Props>`
  flex: 'none';
  height: ${({ size }) => `${size}px`};
`;

export default Spacing;
