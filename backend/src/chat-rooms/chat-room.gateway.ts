import { ChatRoomService } from './chat-room.service';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

interface IChatRoom {
  productId: number;
  sellerId: number;
  buyerId: number;
  content: string;
  senderId: number;
}

@WebSocketGateway(80, { namespace: ['woowatechcamp'] }) // 웹소켓을 8080번 포트에서 열겠다
export class ChatRoomGateway {
  constructor(private readonly chatRoomService: ChatRoomService) {}
  @WebSocketServer()
  server: Server; // 서버 인스턴스에 접근하기 위해서 사용한다.

  @SubscribeMessage('events')
  async handleEvent(@MessageBody() data: IChatRoom) {
    const { productId, sellerId, buyerId, content, senderId } = data;
    const chatRoomId = `${productId}-${sellerId}-${buyerId}`;
    const chat = await this.chatRoomService.createMessage({
      senderId,
      content,
      chatRoomId,
      isRead: false,
    });
    this.server.emit(chatRoomId, chat);
    return;
  }
}
