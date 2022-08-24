import styled, { css } from 'styled-components';
import { TColorToken } from 'src/styles/theme';

interface ITextStyles {
  backgroundColor: TColorToken;
  color: TColorToken;
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
}

function ChatWindow() {
  const myId = 2;
  const chatList = [
    {
      id: 1,
      sender: 1,
      content: '안녕하세요! 궁금한게 있는데요',
    },
    {
      id: 2,
      sender: 2,
      content: '네 안녕하세요!',
    },
    {
      id: 3,
      sender: 1,
      content: '혹시',
    },
    {
      id: 4,
      sender: 1,
      content: '실제로 신어볼 수 있는건가요??',
    },
  ];

  const isMine = (senderId: number) => myId == senderId;
  return (
    <Container>
      {chatList.map((chat) => (
        <SpeechBubble key={chat.id} isMine={isMine(chat.id)}>
          <Text isMine={isMine(chat.id)}>{chat.content}</Text>
        </SpeechBubble>
      ))}
    </Container>
  );
}

export default ChatWindow;

const setSpeechBubbleStyles = (isMine: boolean): ITextStyles => {
  if (isMine) {
    return {
      borderTopRightRadius: '0px',
      backgroundColor: 'primary200',
      color: 'white',
    };
  } else {
    return {
      borderTopLeftRadius: '0px',
      backgroundColor: 'transparent',
      color: 'black',
    };
  }
};

const Container = styled.div`
  height: calc(100% - 52px - 72px - 56px);

  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SpeechBubble = styled.div<{ isMine: boolean }>`
  height: 32px;

  margin: 16px;

  display: flex;
  align-items: center;
  justify-content: ${({ isMine }) => (isMine ? 'end' : 'start')};
`;

const Text = styled.p<{ isMine: boolean }>`
  border-radius: 8px;

  padding: 8px;
  ${({ theme, isMine }) => {
    const { backgroundColor, color, borderTopLeftRadius, borderTopRightRadius } = setSpeechBubbleStyles(isMine);
    return css`
      background-color: ${theme.color[backgroundColor]};
      color: ${theme.color[color]};
      border-top-left-radius: ${borderTopLeftRadius};
      border-top-right-radius: ${borderTopRightRadius};
      border: 1px solid ${theme.color.primary200};
    `;
  }}${({ theme }) => theme.fonts.linkSmall}
`;
