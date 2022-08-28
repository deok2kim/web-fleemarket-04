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
@WebSocketGateway(4300, {
  namespace: 'woowatechcamp',
  cors: true,
})
export class ChatRoomGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatRoomService: ChatRoomService) {}
  roomState = {};

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('woowa')
  async handleEvent(
    @MessageBody() payload: IChatRoom,
    @ConnectedSocket() client: Socket,
  ) {
    const { content, senderId, chatRoomId } = payload;
    console.log(
      `채팅중: ${chatRoomId}에 현재 접속자: ${this.roomState[chatRoomId]}`,
    );

    let isRead = false;
    if (this.roomState[chatRoomId] === 2) {
      isRead = !isRead;
    }
    const chat = await this.chatRoomService.createMessage({
      senderId,
      content,
      chatRoomId,
      isRead,
    });
    this.server.emit(chatRoomId, chat);
    return;
  }

  afterInit(server: Server) {
    console.log('Init', server);
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    const { chatRoomId } = socket.handshake.query;
    console.log(`Client Connected : ${socket.id}`);
    socket.data = { chatRoomId };

    this.roomState[chatRoomId.toString()] = this.roomState[
      chatRoomId.toString()
    ]
      ? 2
      : 1;
    console.log(
      `연결: ${chatRoomId}에 현재 접속자: ${
        this.roomState[chatRoomId.toString()]
      }`,
    );
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log(`Client Disconnected : ${socket.id}`);
    const { chatRoomId } = socket.data;
    this.roomState[chatRoomId] -= 1;
    console.log(
      `종료: ${chatRoomId}에 현재 접속자: ${this.roomState[chatRoomId]}`,
    );
  }
}
