import { RefObject, useEffect, useCallback } from 'react';
import { IMessage } from 'src/types/chatRoom';

function useScrollToBottomChat(targetRef: RefObject<HTMLElement>, isInit: boolean, chatLog: IMessage[]) {
  const scrollToBottom = useCallback(() => {
    targetRef.current?.scrollIntoView({ behavior: 'auto' });
  }, []);
  const initScrollToBottom = useCallback(() => {
    // TODO 수정 예정
    targetRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' });
  }, []);

  useEffect(() => {
    if (!targetRef.current) return;
    scrollToBottom();
  }, [chatLog, targetRef, scrollToBottom]);

  useEffect(() => {
    if (!targetRef.current) return;
    if (!isInit) return;
    initScrollToBottom();
  }, [isInit, targetRef, initScrollToBottom]);
}

export default useScrollToBottomChat;
