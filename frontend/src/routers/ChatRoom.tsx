import Header from 'src/components/common/Header/Header';
import Icon from 'src/components/common/Icon/Icon';
import ChatWindow from 'src/components/ChatRoom/ChatWindow';
import ChatInput from 'src/components/ChatRoom/ChatInput';
import ChatProduct from 'src/components/ChatRoom/ChatProduct';
import { useNavigate, useParams } from 'react-router-dom';
import { useChatRoomQuery } from 'src/queries/chatRoom';
import withAuth from 'src/hocs/withAuth';
import { useLoggedIn } from 'src/contexts/LoggedInContext';

function Chat() {
  const { isLoggedIn } = useLoggedIn();
  const { chatRoomId } = useParams();
  const { data: chatRoom } = useChatRoomQuery(chatRoomId || '0-0-0', { enabled: isLoggedIn || !!chatRoomId });
  const navigate = useNavigate();

  const onClickBack = () => navigate(-1);

  if (!chatRoom) return null;
  return (
    <>
      <Header
        headerTheme="white"
        left={<Icon name="iconChevronLeft" strokeColor="black" onClick={onClickBack} />}
        center={<p>{'유저아이디'}</p>}
        right={<Icon name="iconOut" strokeColor="red" />}
      />

      <ChatProduct product={chatRoom.data.chatRoom.product} />

      <ChatWindow messages={chatRoom.data.chatRoom.messages} partner={chatRoom.data.chatRoom.partner} />

      <ChatInput />
    </>
  );
}

export default withAuth(Chat);
