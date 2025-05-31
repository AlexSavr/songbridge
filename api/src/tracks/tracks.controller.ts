import { Controller, Post, Delete, Param, Body } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { AddTrackDto } from './dto/add-track.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Track } from './track.entity';

@Controller()
export class TracksController {
  constructor(private readonly trackService: TracksService) {}

  @ApiOperation({ summary: 'Добавить трек в комнату' })
  @ApiParam({ name: 'id', description: 'ID комнаты' })
  @ApiBody({ type: AddTrackDto })
  @ApiResponse({ status: 201, description: 'Трек добавлен', type: Track })
  @Post('rooms/:id/track')
  async addTrack(@Param('id') roomId: string, @Body() data: AddTrackDto) {
    return this.trackService.addTrack(roomId, data.title, data.url);
  }

  @ApiOperation({ summary: 'Удалить трек' })
  @ApiParam({ name: 'id', description: 'ID трека' })
  @ApiResponse({ status: 200, description: 'Трек удалён' })
  @Delete('tracks/:id')
  async deleteTrack(@Param('id') trackId: string) {
    await this.trackService.deleteTrack(trackId);
    return { message: 'Track deleted' };
  }
}
