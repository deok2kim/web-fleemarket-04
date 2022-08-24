import Product from 'src/products/entities/product.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import ChatRoom from './entities/chat-room.entity';
import { ChatRoomGateway } from './chat-room.gateway';
import { ChatRoomService } from './chat-room.service';
import { ChatRoomController } from './chat-room.controller';
import { UsersService } from 'src/users/users.service';
import User from 'src/users/entities/user.entity';
import { UserRegion } from 'src/entities/user-region.entity';
import Message from './entities/message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatRoom, User, UserRegion, Message, Product]),
  ],
  exports: [TypeOrmModule],
  controllers: [ChatRoomController],
  providers: [
    ChatRoomGateway,
    ChatRoomService,
    UsersService,
    AuthService,
    JwtService,
  ],
})
export class ChatRoomsModule {}
