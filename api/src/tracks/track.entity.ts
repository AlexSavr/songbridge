import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Room } from '../rooms/room.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Track {
  @ApiProperty({ example: 'track-uuid', description: 'UUID трека' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'My Track', description: 'Название трека' })
  @Column()
  title: string;

  @ApiProperty({
    example: 'http://example.com/track.mp3',
    description: 'Ссылка на трек',
  })
  @Column()
  url: string;

  @ApiProperty({
    example: '2024-05-20T14:30:00.000Z',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  added_at: Date;

  @ApiProperty({ description: 'UUID комнаты' })
  @ManyToOne(() => Room, (room) => room.tracks, { lazy: true })
  room: Promise<Room>;
}
