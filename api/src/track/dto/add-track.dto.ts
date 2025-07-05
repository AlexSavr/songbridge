import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddTrackDto {
  @ApiProperty({ example: 'My Awesome Track', description: 'Название трека' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'https://example.com/track.mp3',
    description: 'Ссылка на трек',
  })
  @IsUrl()
  @IsNotEmpty()
  url: string;
}
