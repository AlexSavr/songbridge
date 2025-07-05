import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { RoomModule } from '../room/room.module';

@Module({
  imports: [TypeOrmModule.forFeature([Track]), RoomModule],
  providers: [TrackService],
  exports: [TrackService],
  controllers: [TrackController],
})
export class TrackModule {}
