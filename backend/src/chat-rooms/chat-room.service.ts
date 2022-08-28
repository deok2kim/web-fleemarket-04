import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ChatRoom from './entities/chat-room.entity';
import Message from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import User from 'src/users/entities/user.entity';
import Product from 'src/products/entities/product.entity';
import { ERROR_CODE, ERROR_MESSAGE } from 'src/common/constant/error-message';
import { ErrorException } from 'src/common/exception/error.exception';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // 채팅 방 만들기
  async createChatRoom(createChatRoomDto: CreateChatRoomDto) {
    return await this.chatRoomRepository.save(createChatRoomDto);
  }

  async updateReadChatMessage(chatRoomId: string, userId: number) {
    return await this.messageRepository
      .createQueryBuilder('message')
      .update(Message)
      .set({ isRead: true })
      .where('chatRoomId=:chatRoomId and senderId !=:userId and isRead=false', {
        chatRoomId,
        userId,
      })
      .execute();
  }
  // 채팅 방 하나 찾기
  async findChatRoom(chatRoomId: string, userId: number) {
    await this.updateReadChatMessage(chatRoomId, userId);
    let chatRoomData = await this.chatRoomRepository
      .createQueryBuilder('chatRoom')
      .where('chatRoom.id =:chatRoomId', { chatRoomId })
      .leftJoinAndSelect('chatRoom.messages', 'messages')
      .leftJoinAndSelect('chatRoom.product', 'product')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.productStatus', 'productStatus')
      .leftJoinAndSelect('chatRoom.seller', 'seller', 'seller.id != :userId', {
        userId,
      })
      .leftJoinAndSelect('chatRoom.buyer', 'buyer', 'buyer.id != :userId', {
        userId,
      })
      .getOne();
    let partner;
    let thumbnail;
    let productStatus;
    if (chatRoomData) {
      partner = getPartner2(chatRoomData.seller, chatRoomData.buyer);
      thumbnail = getThumbnail(chatRoomData.product.images);
      productStatus = getProductStatus(chatRoomData.product);
      deleteRestChatRoomInfo(chatRoomData);
      deleteProductRestInfo(chatRoomData);

      return {
        chatRoom: {
          ...chatRoomData,
          partner,
          product: {
            ...chatRoomData.product,
            thumbnail,
            productStatus,
          },
        },
      };
    }

    const [productId, sellerId, buyerId] = chatRoomId.split('-').map((v) => +v);
    const seller = await this.userRepository.findOne({
      where: { id: sellerId },
    });
    const buyer = await this.userRepository.findOne({
      where: { id: buyerId },
    });
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!seller || !buyer) {
      throw new ErrorException(
        ERROR_MESSAGE.NOT_FOUND_USER,
        ERROR_CODE.NOT_FOUND_USER,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!product) {
      throw new ErrorException(
        ERROR_MESSAGE.NOT_FOUND_PRODUCT,
        ERROR_CODE.NOT_FOUND_PRODUCT,
        HttpStatus.BAD_REQUEST,
      );
    }

    chatRoomData = await this.createChatRoom({
      id: chatRoomId,
      productId,
      sellerId,
      buyerId,
    });

    return {
      chatRoom: {
        ...chatRoomData,
        messages: [],
        deleteUserId: 0,
        partner: seller,
        product: {
          id: product.id,
          thumbnail: product.images[0],
          title: product.title,
          price: product.price,
          productStatus: product.productStatus.name,
        },
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
      .where(
        '(chatRoom.sellerId = :userId OR chatRoom.buyerId = :userId) and chatRoom.deleteUserId = 0',
        {
          userId,
        },
      )
      .getMany();

    let thumbnail;
    let partner;
    const chatRooms = chatRoomData
      .filter((chatRoomOne) => chatRoomOne.messages.length)
      .map((chatRoomOne) => addUnreadMessageCount(chatRoomOne, userId))
      .map((chatRoomOne) => {
        thumbnail = getThumbnail(chatRoomOne.product.images);
        partner = chatRoomOne[getPartner(chatRoomOne.buyerId, userId)];
        deleteRestInfo(chatRoomOne, partner);
        deleteProductRestInfo(chatRoomOne);
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
        unreadCount: calcUnreadMessageCount(chatRoomOne.messages, userId),
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

  // 채팅방 삭제
  async deleteChatRoom(chatRoomId: string) {
    return await this.chatRoomRepository
      .createQueryBuilder('chatRoom')
      .delete()
      .where('id = :chatRoomId', { chatRoomId })
      .execute();
  }
}

export const calcUnreadMessageCount = (messages, userId: number) => {
  let count = 0;
  [...messages].reverse().some((message) => {
    if (message.senderId === userId || message.isRead) return true;
    if (!message.isRead) count++;
  });
  return count;
};

export const getLastMessage = (messages) => [messages[messages.length - 1]];

export const getThumbnail = (images) => images[0];

export const getPartner = (buyerId, myId) =>
  buyerId === myId ? 'seller' : 'buyer';

export const getProductStatus = (product) => product.productStatus.name;

export const addUnreadMessageCount = (chatRoom, userId: number) => ({
  ...chatRoom,
  unreadCount: calcUnreadMessageCount(chatRoom.messages, userId),
});

export const deleteRestInfo = (chatRoom, partner) => {
  delete partner.snsId;
  delete partner.provider;
};

export const getPartner2 = (seller, buyer) => {
  if (seller) return { id: seller.id, nickname: seller.nickname };
  return {
    id: buyer.id,
    nickname: buyer.nickname,
  };
};

export const deleteProductRestInfo = (chatRoom) => {
  delete chatRoom.product.content;
  delete chatRoom.product.categoryId;
  delete chatRoom.product.images;
  delete chatRoom.product.productStatus;
};

export const deleteRestChatRoomInfo = (chatRoom) => {
  delete chatRoom.seller;
  delete chatRoom.buyer;
};

export const deleteRestUserInfo = (user) => {
  delete user.snsId;
  delete user.provider;
};
