import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticService } from './elastic.service';
import { ElasticController } from './elastic.controller';
import { RedisService } from 'src/redis/redis.service';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { ElasticProductsService } from './product/elastic.product.service';
import { ElasticProductsController } from './product/elastic.products.controller';

@Global()
@Module({
    imports:[
        ElasticsearchModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
                node: config.get("ELASTIC_NODE"),
                auth: {
                    username: config.get("ELASTIC_USER"),
                    password: config.get("ELASTIC_PASS")
                },
                tls:{
                    rejectUnauthorized:false
                }
            }),
            inject: [ConfigService]
        }), CacheModule.register({})
    ],
    providers:[ElasticService,RedisService, ElasticProductsService],
    controllers:[ElasticController,ElasticProductsController]

})
export class ElasticModule {}
