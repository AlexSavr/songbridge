import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './track.entity';
import { Room } from '../room/room.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async addTrack(roomId: string, title: string, url: string): Promise<Track> {
    const room = await this.roomRepository.findOneBy({ id: roomId });
    if (!room) throw new Error('Room not found');

    const track = this.trackRepository.create({
      title,
      url,
      room: Promise.resolve(room),
    });

    return this.trackRepository.save(track);
  }

  async deleteTrack(trackId: string): Promise<void> {
    await this.trackRepository.delete(trackId);
  }
}
