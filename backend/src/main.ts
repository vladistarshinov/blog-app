import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: true,
      credentials: true,
    },
  });
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  const config = app.get(ConfigService);
  const options = new DocumentBuilder()
    .setTitle('Story Journal API')
    .setDescription('Story Journal API')
    .setVersion('1.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = config.get<number>('API_PORT') || 3000;
  await app.listen(port, () => {
    console.log(`App started at port ${port}`);
  });
}
bootstrap();
