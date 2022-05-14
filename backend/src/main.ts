import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const config = await app.get(ConfigService);
  const swConfig = new DocumentBuilder()
    .setTitle('Story Journal API')
    .setVersion('1.0')
    .setExternalDoc('Postman', '/docs-json')
    .build();

  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, swConfig));
  const port = config.get<number>('API_PORT') || 3000;
  await app.listen(port, () => {
    console.log(`App started at port ${port}`);
  });
}
bootstrap();
