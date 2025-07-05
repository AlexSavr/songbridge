import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({
    example: 'Лучшая комната',
    description: 'Название комнаты',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;
}
