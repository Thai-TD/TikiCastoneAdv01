import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

async function bootstrap() {
  //define logger
  const logger = WinstonModule.createLogger({
    defaultMeta: { service: "Shipping service" },
    transports: [
      new winston.transports.Console(),
      new winston.transports.Http({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        level: "info"
      })
    ]
  });

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    logger,
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABITMQ_URL],
      queue: process.env.RABITMQ_SHIPPING_QUEUE,
      queueOptions: {
        durable: false
      }
    }
  });

  await app.listen();
}
bootstrap();
