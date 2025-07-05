import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './room.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateRoomDto } from './dto/create-room.dto';
import { TypeApiResponse } from '../types/api.base';

@Controller('room')
export class RoomController {
  constructor(private readonly roomsService: RoomService) {}

  @ApiOperation({ summary: 'Создать новую комнату' })
  @ApiResponse({
    status: 201,
    description: 'Комната успешно создана',
    type: Room,
  })
  @Post('create')
  async create(
    @Body() createRoomDto: CreateRoomDto,
  ): Promise<TypeApiResponse<{ room_id: string }>> {
    try {
      const room = await this.roomsService.create(createRoomDto);
      return { success: true, data: { room_id: room.id } };
    } catch (error) {
      return {
        success: false,
        error: { message: error.message },
      };
    }
  }

  @ApiOperation({ summary: 'Получить комнату по ID' })
  @ApiResponse({ status: 200, description: 'Данные комнаты', type: Room })
  @Get(':id')
  async getRoom(@Param('id') id: string): Promise<TypeApiResponse<Room>> {
    try {
      const room = await this.roomsService.getRoom(id);
      // @ts-ignore: Преобразование чтобы вернуть не промис
      room.tracks = await room.tracks;
      return { success: true, data: room };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }
}
