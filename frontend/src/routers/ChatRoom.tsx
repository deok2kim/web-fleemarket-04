import Header from 'src/components/common/Header/Header';
import Icon from 'src/components/common/Icon/Icon';
import ChatWindow from 'src/components/ChatRoom/ChatWindow';
import ChatInput from 'src/components/ChatRoom/ChatInput';
import ChatProduct from 'src/components/ChatRoom/ChatProduct';

function Chat() {
  return (
    <>
      <Header
        headerTheme="white"
        left={<Icon name="iconChevronLeft" strokeColor="black" />}
        center={<p>{'유저아이디'}</p>}
        right={<Icon name="iconOut" strokeColor="red" />}
      />

      <ChatProduct />

      <ChatWindow />

      <ChatInput />
    </>
  );
}

export default Chat;
