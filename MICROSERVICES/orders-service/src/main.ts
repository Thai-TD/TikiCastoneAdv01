import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';


async function bootstrap() {

  const logger = WinstonModule.createLogger({
    defaultMeta: {service: "API Orders"},
    transports:[
      new winston.transports.Console(),
      new winston.transports.Http({
        host: process.env.LOGTASH_HOST,
        port: Number(process.env.LOGTASH_PORT),
        level: "error"
      })
    ]
  })

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
    logger,
    transport: Transport.RMQ,
    options:{
      urls:[process.env.RABITMQ_URL],
      queue: process.env.RABITMQ_ORDERS_QUEUE,
      queueOptions:{
        durable: false
      }
    }
  });
  await app.listen();
}
bootstrap();
