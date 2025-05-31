import { Controller, Get, Post, Param } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Room } from './room.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @ApiOperation({ summary: 'Создать комнату' })
  @ApiResponse({ status: 201, description: 'Комната создана', type: Room })
  @Post('create')
  async create(): Promise<{ room_id: string }> {
    const room = await this.roomsService.create();
    return { room_id: room.id };
  }

  @ApiOperation({ summary: 'Получить комнату по ID' })
  @ApiResponse({ status: 200, description: 'Данные комнаты', type: Room })
  @Get(':id')
  async getRoom(@Param('id') id: string): Promise<Room> {
    const room = await this.roomsService.getRoom(id);
    // @ts-ignore: Преобразование чтобы вернуть не промис
    room.tracks = await room.tracks;
    return room;
  }
}
