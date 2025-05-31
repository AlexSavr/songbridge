import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async create(): Promise<Room> {
    const room = this.roomRepository.create();
    return this.roomRepository.save(room);
  }

  async getRoom(id: string): Promise<Room | null> {
    try {
      return await this.roomRepository.findOneByOrFail({ id: id });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new NotFoundException('Room not found');
    }
  }
}
