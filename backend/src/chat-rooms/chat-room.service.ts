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
        deleteUserId: 0,
      },
    };
  }

  // 1. 나의 모든 채팅방
  async findAllMyChatRoom(userId: number) {
    const chatRoomData = await this.chatRoomRepository
      .createQueryBuilder('chatRoom')
      .leftJoinAndSelect('chatRoom.messages', 'messages')
      .leftJoinAndSelect('chatRoom.product', 'product')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('chatRoom.seller', 'seller')
      .leftJoinAndSelect('chatRoom.buyer', 'buyer')
      .where('chatRoom.sellerId = :userId OR chatRoom.buyerId = :userId', {
        userId,
      })
      .getMany();

    let thumbnail;
    let partner;
    const chatRooms = chatRoomData
      .filter((chatRoomOne) => chatRoomOne.messages.length)
      .map(addUnreadMessageCount)
      .map((chatRoomOne) => {
        thumbnail = getThumbnail(chatRoomOne.product.images);
        partner = chatRoomOne[getPartner(chatRoomOne.buyerId, userId)];
        deleteRestInfo(chatRoomOne, partner);

        return {
          ...chatRoomOne,
          messages: getLastMessage(chatRoomOne.messages),
          product: {
            ...chatRoomOne.product,
            thumbnail,
          },
          partner,
        };
      });

    return { chatRooms };
  }

  // 2. 내가 판매중인 {어떤 상품}의 모든 채팅방
  async findAllMyProductChatRoom(userId: number, productId: number) {
    const chatRoomData = await this.chatRoomRepository
      .createQueryBuilder('chatRoom')
      .leftJoinAndSelect('chatRoom.messages', 'messages')
      .leftJoinAndSelect('chatRoom.product', 'product')
      .leftJoinAndSelect('product.images', 'images')
      .where(
        'chatRoom.sellerId = :userId AND chatRoom.productId = :productId',
        {
          userId,
          productId,
        },
      )
      .getMany();

    let thumbnail;
    const chatRooms = chatRoomData
      .filter((chatRoomOne) => chatRoomOne.messages.length)
      .map((chatRoomOne) => ({
        ...chatRoomOne,
        unreadCount: calcUnreadMessageCount(chatRoomOne.messages),
      }))
      .map((chatRoomOne) => {
        thumbnail = getThumbnail(chatRoomOne.product.images);

        delete chatRoomOne.product.content;
        delete chatRoomOne.product.categoryId;
        delete chatRoomOne.product.userId;
        delete chatRoomOne.product.images;
        return {
          ...chatRoomOne,
          messages: getLastMessage(chatRoomOne.messages),
          product: {
            ...chatRoomOne.product,
            thumbnail,
          },
        };
      });

    return { chatRooms };
  }

  // 채팅 하나 입력
  async createMessage(createMessageDto: CreateMessageDto) {
    return await this.messageRepository.save(createMessageDto);
  }
}

export const calcUnreadMessageCount = (messages) =>
  messages.filter((message) => !message.isRead).length;

export const getLastMessage = (messages) => [messages[messages.length - 1]];

export const getThumbnail = (images) => images[0];

export const getPartner = (buyerId, myId) =>
  buyerId === myId ? 'seller' : 'buyer';

export const addUnreadMessageCount = (chatRoom) => ({
  ...chatRoom,
  unreadCount: calcUnreadMessageCount(chatRoom.messages),
});

export const deleteRestInfo = (chatRoom, partner) => {
  delete chatRoom.product.content;
  delete chatRoom.product.categoryId;
  delete chatRoom.product.userId;
  delete chatRoom.product.images;
  delete chatRoom.seller;
  delete chatRoom.buyer;
  delete partner.snsId;
  delete partner.provider;
};
