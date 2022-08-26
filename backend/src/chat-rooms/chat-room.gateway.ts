import { ChatRoomService } from './chat-room.service';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface IChatRoom {
  content: string;
  senderId: number;
  chatRoomId: string;
}

@WebSocketGateway(80, {
  namespace: 'woowatechcamp',
  cors: true,
})
export class ChatRoomGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatRoomService: ChatRoomService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('woowa')
  async handleEvent(
    @MessageBody() payload: IChatRoom,
    @ConnectedSocket() client: Socket,
  ) {
    const { content, senderId, chatRoomId } = payload;
    const chat = await this.chatRoomService.createMessage({
      senderId,
      content,
      chatRoomId,
      isRead: false,
    });
    this.server.emit(chatRoomId, chat);
    return;
  }

  afterInit(server: Server) {
    console.log('Init', server);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client Disconnected : ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client Connected : ${client.id}`);
  }
}
