import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
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
  ): Promise<TypeApiResponse<{ room: Room }>> {
    try {
      const room = await this.roomsService.create(createRoomDto);
      return { success: true, data: { room } };
    } catch (error) {
      return {
        success: false,
        error: { message: error.message },
      };
    }
  }

  @ApiOperation({ summary: 'Получить комнату по ID' })
  @ApiResponse({ status: 200, description: 'Данные комнаты', type: Room })
  @ApiResponse({
    status: 400,
    description: 'Неверный запрос',
  })
  @ApiResponse({
    status: 404,
    description: 'Комната не найдена',
  })
  @ApiResponse({
    status: 500,
    description: 'Внутренняя ошибка сервера',
  })
  @Get(':id')
  async getRoom(@Param('id') id: string): Promise<TypeApiResponse<Room>> {
    try {
      const room = await this.roomsService.getRoom(id);

      // @ts-ignore: Преобразование чтобы вернуть не промис
      room.tracks = await room.tracks;
      return { success: true, data: room };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException({
          success: false,
          error: { message: error.message },
        });
      }
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
