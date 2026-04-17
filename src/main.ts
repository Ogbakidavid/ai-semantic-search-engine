import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // This helps validate incoming JSON data automatically
  app.useGlobalPipes(new ValidationPipe({ whitelist: true}));

  // Set a global prefix so your routes are /api/v1/...
  app.setGlobalPrefix("api");

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running http://localhost:${process.env.PORT}`);
}
bootstrap();
