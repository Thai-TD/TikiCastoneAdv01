import { Module } from '@nestjs/common';
// import { FoodsModule } from './foods/foods.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticModule } from './elastic/elastic.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule, RedisModule, ElasticModule, AuthModule, ProductsModule, CartsModule],
  controllers: [],
  providers: [ PrismaService],
})
export class AppModule {}
