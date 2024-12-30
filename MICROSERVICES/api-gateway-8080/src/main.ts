import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const logger = WinstonModule.createLogger({
    defaultMeta: { service: "API Gateway" },
    transports: [
      new winston.transports.Console(),
      new winston.transports.Http({
        host: process.env.LOGTASH_HOST,
        port: Number(process.env.LOGTASH_PORT),
        level: "error"
      })
      // new winston.transports.File({
      //   filename: "log/log_info.log",
      //   level: "info"
      // })
    ]
  });
  const app = await NestFactory.create(AppModule, {
    logger
  });

  const config = new DocumentBuilder()
    .setTitle("SWagger example")
    .setDescription("User api description")
    .addBearerAuth({ type: 'http', scheme: 'Bearer', bearerFormat: 'Token' }, 'access-token')
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();

  await app.listen(8080);
}
bootstrap();
