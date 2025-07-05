import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Music Rooms API')
    .setDescription('API для управления комнатами и треками')
    .setVersion('1.0')
    .addTag('Room', 'Управление комнатами')
    .addTag('Track', 'Управление треками')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.API_PORT ?? 3000);
}
bootstrap();
