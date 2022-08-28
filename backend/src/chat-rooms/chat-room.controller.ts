import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ChatRoomService } from './chat-room.service';

@Controller('chatRoom')
export class ChatRoomController {
  constructor(
    private readonly chatRoomService: ChatRoomService,
    private readonly authService: AuthService,
  ) {}

  // 나의 모든 채팅 방 찾기
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllMyChatRoom(@Req() req) {
    return this.chatRoomService.findAllMyChatRoom(req.user.id);
  }

  // 내가 판매중인 어떤 상품의 채팅 방 찾기
  @Get('/products/:productId')
  @UseGuards(JwtAuthGuard)
  async findAllMyProductChatRoom(
    @Req() req,
    @Param('productId') productId: number,
  ) {
    return this.chatRoomService.findAllMyProductChatRoom(
      req.user.id,
      productId,
    );
  }

  // 채팅 룸 하나 찾기 + 메시지도 같이 줘야됨!
  @Get('/:chatRoomId')
  @UseGuards(JwtAuthGuard)
  findChatRoom(@Req() req, @Param('chatRoomId') chatRoomId: string) {
    // TODO: seller 나 buyer 둘 중 하나가 로그인한 유저
    return this.chatRoomService.findChatRoom(chatRoomId, req.user.id);
  }

  @Delete('/:chatRoomId')
  @UseGuards(JwtAuthGuard)
  deleteChatRoom(@Param('chatRoomId') chatRoomId: string) {
    return this.chatRoomService.deleteChatRoom(chatRoomId);
  }
}
