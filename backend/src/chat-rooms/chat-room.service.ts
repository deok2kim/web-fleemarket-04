import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ChatRoom from './entities/chat-room.entity';
import Message from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  // 채팅 방 만들기
  async createChatRoom(createChatRoomDto: CreateChatRoomDto) {
    return await this.chatRoomRepository.save(createChatRoomDto);
  }
  // 채팅 방 하나 찾기
  async findChatRoom(id: string) {
    let chatRoom = await this.chatRoomRepository.findOne({
      where: {
        id,
      },
      relations: ['messages'],
    });
    if (chatRoom) return chatRoom;

    const [productId, sellerId, buyerId] = id.split('-').map((v) => +v);
    chatRoom = await this.createChatRoom({
      id,
      productId,
      sellerId,
      buyerId,
    });

    return {
      chatRoom: {
        ...chatRoom,
        messages: [],
        deleteUser: 0,
      },
    };
  }

  // 1. 나의 모든 채팅방
  async findAllMyChatRoom(userId: number) {
    return await this.chatRoomRepository.find({
      where: [{ sellerId: userId }, { buyerId: userId }],
      relations: ['messages'],
    });
  }

  // 2. 내가 판매중인 {어떤 상품}의 모든 채팅방
  async findAllMyProductChatRoom(userId: number, productId: number) {
    return await this.chatRoomRepository.find({
      where: [{ sellerId: userId }, { productId }],
      relations: ['messages'],
    });
  }

  // 채팅 하나 입력
  async createMessage(createMessageDto: CreateMessageDto) {
    return await this.messageRepository.save(createMessageDto);
  }
}
