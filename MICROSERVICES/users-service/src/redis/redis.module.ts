import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports:[
    CacheModule.registerAsync({
      imports:[ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get("REDIS_HOST"),
        port: configService.get("REDIS_PORT"),
        auth_pass: configService.get("REDIS_PASSWORD"),
        ttl: 30000,
        isGlobal: true
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [RedisController],
  providers: [RedisService],
})
export class RedisModule {}
