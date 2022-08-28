import { IConfirmModalParams } from 'src/contexts/ModalContext';
import styled, { css } from 'styled-components';
import Button from '../Button/Button';

import Portal from '../Portal/Portal';

interface Props extends IConfirmModalParams {
  isOpen: boolean;
}

function ConfirmModal({ isOpen, title, cancelOption, submitOption }: Props) {
  if (!isOpen) return null;

  return (
    <Portal elementId="modal">
      <Container>
        <Background />
        <Wrapper>
          <Title>{title}</Title>
          <ButtonWrapper>
            <CancelButton size="md" title={cancelOption.label} onClick={cancelOption.onClick} />
            <SubmitButton size="md" title={submitOption.label} onClick={submitOption.onClick} />
          </ButtonWrapper>
        </Wrapper>
      </Container>
    </Portal>
  );
}

export default ConfirmModal;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.zIndex.modal};
`;

const Background = styled.div`
  position: fixed;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.6);
`;

const Wrapper = styled.div`
  width: 330px;

  display: flex;
  flex-direction: column;
  gap: 18px;

  padding: 24px;
  border-radius: 8px;

  background-color: ${({ theme }) => theme.color.white};
  z-index: ${({ theme }) => theme.zIndex.modalContent};
`;

const Title = styled.p`
  ${({ theme }) => theme.fonts.textMedium};

  white-space: pre-line;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const SubmitButton = styled(Button)`
  height: 42px;
`;

const CancelButton = styled(SubmitButton)`
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.grey100};
  color: ${({ theme }) => theme.color.black};

  &:hover {
    background-color: ${({ theme }) => theme.color.grey300};
  }
`;
