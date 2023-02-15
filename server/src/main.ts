import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.enableCors();

  app.useStaticAssets(
    join(
      '/Users/lam/Desktop/Project-StockX/web/Backend/stock-x-server',

      'upload',
    ),
    {
      prefix: '/upload/',
    },
  );

  await app.listen(3000);
}
bootstrap();
