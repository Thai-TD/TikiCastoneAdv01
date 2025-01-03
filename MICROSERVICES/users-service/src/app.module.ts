import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ElasticModule } from './elastic/elastic.module';
import { RedisModule } from './redis/redis.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
  UsersModule, AuthModule, PrismaModule, ElasticModule, RedisModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
