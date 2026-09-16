import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: true,
    logger: ['error', 'warn', 'log', 'verbose', 'debug'],
  });
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
