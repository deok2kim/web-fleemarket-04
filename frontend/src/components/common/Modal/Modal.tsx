import { useModalFactory } from 'src/contexts/ModalContext';
import styled, { css } from 'styled-components';
import Button from '../Button/Button';
import ButtonLocation from '../Button/ButtonLocation';

import Portal from '../Portal/Portal';

function Modal() {
  const { title, isOpen, onClose, onOk } = useModalFactory();

  return (
    <Portal elementId="modal">
      <Background isOpen={isOpen}>
        <Container>
          <Title>{title}</Title>
          <ButtonWrapper>
            <CancelButton size="md" title="취소" onClick={onClose} />
            <Button size="md" title="네, 나갈래요" onClick={onOk} />
          </ButtonWrapper>
        </Container>
      </Background>
    </Portal>
  );
}

export default Modal;

const Background = styled.div<{ isOpen: boolean }>`
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.9);

  ${({ isOpen }) =>
    isOpen
      ? css`
          display: flex;
          justify-content: center;
          align-items: center;
        `
      : css`
          display: none;
        `}
`;

const Container = styled.div`
  width: 330px;

  display: flex;
  flex-direction: column;
  gap: 18px;

  padding: 24px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.black};

  background-color: ${({ theme }) => theme.color.white};
`;

const Title = styled.p`
  ${({ theme }) => theme.fonts.textMedium}
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const CancelButton = styled(Button)`
  background-color: inherit;
  border: 1px solid ${({ theme }) => theme.color.grey100};
  color: ${({ theme }) => theme.color.black};
`;
