import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RabbitMQ } from './common/constans';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.AMQP_URL],
      queue: RabbitMQ.UserQueue,
    }
  });
  await app.listen();
}
bootstrap();
