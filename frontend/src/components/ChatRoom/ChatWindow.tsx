import styled, { css } from 'styled-components';
import { TColorToken } from 'src/styles/theme';
import { IMessage, IUserForChat } from 'src/types/chatRoom';
import { useEffect, useRef } from 'react';
import useScrollToBottomChat from 'src/hooks/useScrollToBottomChat';
import { useUserInfo } from 'src/queries/user';

interface ITextStyles {
  backgroundColor: TColorToken;
  color: TColorToken;
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
}

interface Props {
  messages: IMessage[];
  newChatLog: IMessage[];
}

function ChatWindow({ messages, newChatLog }: Props) {
  const lastMessageTarget = useRef<HTMLDivElement>(null);
  const { data: userInfo } = useUserInfo();
  useScrollToBottomChat(lastMessageTarget, !!messages, newChatLog);

  if (!messages) return null;
  const isMine = (senderId: number) => senderId === userInfo?.data.id;

  return (
    <Container>
      {messages.map(({ id, senderId, isRead, content }) => (
        <SpeechBubble key={id} isMine={isMine(senderId)}>
          <Text isMine={isMine(senderId)}>{content}</Text>
        </SpeechBubble>
      ))}
      {newChatLog.map(({ id, senderId, isRead, content }) => (
        <SpeechBubble key={id} isMine={isMine(senderId)}>
          <Text isMine={isMine(senderId)}>{content}</Text>
        </SpeechBubble>
      ))}
      <div ref={lastMessageTarget}></div>
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
  margin: 16px;

  display: flex;
  align-items: center;
  justify-content: ${({ isMine }) => (isMine ? 'end' : 'start')};
`;

const Text = styled.p<{ isMine: boolean }>`
  border-radius: 8px;

  max-width: 80%;

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
  }};
  ${({ theme }) => theme.fonts.linkSmall};
`;
