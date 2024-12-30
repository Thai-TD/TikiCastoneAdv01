import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import * as redisStore from 'cache-manager-redis-store';

@Global()
@Module({
    imports: [
        // CacheModule.register({
        //     store: redisStore,
        //     host: process.env.REDIS_HOST,
        //     port: process.env.REDIS_PORT,
        //     auth_pass: process.env.REDIS_PASSWORD,
        //     ttl: 30000,
        //     isGlobal: true
        // }),
        CacheModule.registerAsync({
            imports:[ConfigModule],
            useFactory: async (configService: ConfigService )=>({
                store: redisStore,
                host: configService.get('REDIS_HOST'),
                port: configService.get('REDIS_PORT'),
                auth_pass: configService.get('REDIS_PASSWORD'),
                ttl: 30000,
                isGlobal: true
            }),
            inject: [ConfigService]
        })
    ],
    exports: [CacheModule,RedisService],
    providers: [RedisService, ],
    // controllers: [RedisController]
})
export class RedisModule {}
