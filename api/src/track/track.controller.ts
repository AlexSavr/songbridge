import { Controller, Post, Delete, Param, Body } from '@nestjs/common';
import { TrackService } from './track.service';
import { AddTrackDto } from './dto/add-track.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Track } from './track.entity';
import { TypeApiResponse } from '../types/api.base';

@Controller()
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @ApiOperation({ summary: 'Добавить трек в комнату' })
  @ApiParam({ name: 'id', description: 'ID комнаты' })
  @ApiBody({ type: AddTrackDto })
  @ApiResponse({ status: 201, description: 'Трек добавлен', type: Track })
  @Post('room/:id/track/add')
  async addTrack(
    @Param('id') roomId: string,
    @Body() data: AddTrackDto,
  ): Promise<TypeApiResponse<Track>> {
    try {
      const track = await this.trackService.addTrack(
        roomId,
        data.title,
        data.url,
      );
      return { success: true, data: track };
    } catch (error) {
      return {
        success: false,
        error: { message: error.message },
      };
    }
  }

  @ApiOperation({ summary: 'Удалить трек' })
  @ApiParam({ name: 'id', description: 'ID трека' })
  @ApiResponse({ status: 200, description: 'Трек удалён' })
  @Delete('track/:id')
  async deleteTrack(
    @Param('id') trackId: string,
  ): Promise<TypeApiResponse<{ message: string }>> {
    try {
      await this.trackService.deleteTrack(trackId);
      return { success: true, data: { message: 'Track deleted' } };
    } catch (error) {
      return {
        success: false,
        error: { message: error.message },
      };
    }
  }
}
