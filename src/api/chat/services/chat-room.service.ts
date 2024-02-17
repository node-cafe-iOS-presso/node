import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoom } from '../entities/chat-room.entity';
import { Repository } from 'typeorm';
import { Chat } from '../entities/chat.entity';
import { Model } from 'src/api/model/entities/model.entity';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    @InjectRepository(ChatRoom)
    private readonly chatRoomRepository: Repository<ChatRoom>,
  ) {}

  /**
   * @summary find one by id
   * @author  이강욱
   * @param   { number } id
   * @returns { Promise<ChatRoom> }
   */
  async findOne(id: number): Promise<ChatRoom> {
    return await this.chatRoomRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * @summary 채팅방 조회 API Service
   * @author  이강욱
   * @param   { number } id
   * @param   { number } userId
   * @returns
   */
  async findChatRoomById(id: number, userId: number) {
    /**
     * (1) 최근 채팅방 리스트들 조회
     * -- 메세지를 가장 마지막에 보내거나 마지막에 보낸 채팅방 순서대로
     * (2) 채팅 내역 리스트들 조회
     */

    const recentChatRooms = await this.findRecentChatRoomList(userId);
    for await (const room of recentChatRooms) {
      room['messages'] = await this.findChatMessagesByRoom(room['chatRoomId']);
    }
    return recentChatRooms;
  }

  /**
   * @summary 채팅방 조회 API Service - 최근 채팅방 리스트 조회
   * @author  이강욱
   * @param   { number } userId
   * @returns { Promise<ChatRoom[]> }
   */
  async findRecentChatRoomList(userId: number): Promise<ChatRoom[]> {
    return await this.chatRoomRepository
      .createQueryBuilder()
      .select('cr.id', 'chatRoomId')
      .addSelect('m.name', 'modelName')
      .from(ChatRoom, 'cr')
      .innerJoin(Chat, 'c', 'c.chatRoomId = cr.id')
      .innerJoin(Model, 'm', 'cr.modelId = m.id')
      .where('cr.userId = :userId', { userId })
      .andWhere('cr.deletedAt IS NULL')
      .andWhere('c.deletedAt IS NULL')
      .groupBy('cr.id')
      .orderBy('c.createdAt', 'DESC')
      .getRawMany();
  }

  /**
   * @summary 채팅방 조회 API Service - 채팅 내역 조회
   * @author  이강욱
   * @param   { number } roomId
   * @returns { Promise<Chat[]> }
   */
  async findChatMessagesByRoom(roomId: number): Promise<Chat[]> {
    return await this.chatRepository
      .createQueryBuilder()
      .select('*')
      .from(Chat, 'c')
      .where('c.chatRoomId = :chatRoomId', { chatRoomId: roomId })
      .andWhere('c.deletedAt IS NULL')
      .orderBy('c.createdAt')
      .addOrderBy('c.id')
      .getRawMany();
  }
}
