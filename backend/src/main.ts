import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar CORS
  app.enableCors({
    origin: 'http://localhost:3000', // URL de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Si usas cookies/tokens
    allowedHeaders: 'Content-Type, Authorization, Accept',
  });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
