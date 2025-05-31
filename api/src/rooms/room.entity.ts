import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Track } from '../tracks/track.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Room {
  @ApiProperty({ example: 'a1b2c3d4', description: 'UUID комнаты' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Лучшая комната',
    description: 'Название комнаты',
    required: false,
  })
  @Column({ nullable: true })
  name: string;

  @ApiProperty({
    example: '2024-05-20T14:30:00.000Z',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiProperty({
    type: () => Track,
    isArray: true,
    description: 'Список треков в комнате',
    example: [
      {
        id: 'track-uuid-1',
        title: 'My Track 1',
        url: 'https://example.com/track1.mp3',
        added_at: '2024-05-20T15:00:00.000Z',
      },
    ],
  })
  @OneToMany(() => Track, (track) => track.room, { lazy: true })
  tracks: Promise<Track[]>;
}
