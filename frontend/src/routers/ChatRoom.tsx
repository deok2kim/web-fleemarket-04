import Header from 'src/components/common/Header/Header';
import Icon from 'src/components/common/Icon/Icon';
import ChatWindow from 'src/components/ChatRoom/ChatWindow';
import ChatInput from 'src/components/ChatRoom/ChatInput';
import ChatProduct from 'src/components/ChatRoom/ChatProduct';
import { useNavigate, useParams } from 'react-router-dom';
import { useChatRoomQuery } from 'src/queries/chatRoom';
import withAuth from 'src/hocs/withAuth';
import { useLoggedIn } from 'src/contexts/LoggedInContext';
import { useEffect, useState } from 'react';
import { useSocket } from 'src/hooks/useSocket';
import { IMessage } from 'src/types/chatRoom';
import { useUserInfo } from 'src/queries/user';

function Chat() {
  const { isLoggedIn } = useLoggedIn();
  const { data: userInfo } = useUserInfo();
  const chatRoomId = useParams<{ chatRoomId: string }>().chatRoomId as string;
  const { data: chatRoom, isLoading } = useChatRoomQuery(chatRoomId, {
    enabled: isLoggedIn && !!chatRoomId,
    cacheTime: 0,
  });
  const [newChatLog, setNewChatLog] = useState<IMessage[]>([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { socket, sendMessage, disconnectSocket } = useSocket(chatRoomId);
  useEffect(() => {
    if (!chatRoomId) return;

    socket.on(chatRoomId, (res) => {
      setNewChatLog((prev) => [...prev, res]);
    });
    return () => {
      socket.on('disconnect', () => {
        console.log(socket.disconnected);
      });
    };
  }, [socket, chatRoomId]);

  const onClickBack = () => navigate(-1);

  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };

  const onClickSubmit = (): void => {
    if (!message.trim()) return;
    sendMessage({
      chatRoomId,
      content: message,
      senderId: userInfo?.data.id,
    });
    setMessage('');
  };
  if (!chatRoom) return null;

  if (isLoading) return null;

  return (
    <>
      <Header
        headerTheme="white"
        left={<Icon name="iconChevronLeft" strokeColor="black" onClick={onClickBack} />}
        center={<p>{'유저아이디'}</p>}
        right={<Icon name="iconOut" strokeColor="red" />}
      />
      <ChatProduct product={chatRoom.data.chatRoom.product} />

      <ChatWindow
        messages={chatRoom.data.chatRoom.messages}
        partner={chatRoom.data.chatRoom.partner}
        newChatLog={newChatLog}
      />

      <ChatInput message={message} onChangeMessage={onChangeMessage} onClickSubmit={onClickSubmit} />
    </>
  );
}

export default withAuth(Chat);
