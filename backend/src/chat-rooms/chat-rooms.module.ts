import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import ChatRoom from './entities/chat-room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom])],
  exports: [TypeOrmModule],
})
export class ChatRoomsModule {}
