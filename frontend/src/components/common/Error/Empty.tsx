import styled from 'styled-components';
import Image from '../Image/Image';

function Empty() {
  return (
    <Container>
      <Image name="imageEmpty" height={400} />
    </Container>
  );
}

export default Empty;

const Container = styled.div`
  margin-top: 60px;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
`;
