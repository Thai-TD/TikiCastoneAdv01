import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticService } from './elastic.service';
import { ElasticController } from './elastic.controller';

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
        })
    ],
    providers:[ElasticService],
    controllers:[ElasticController]

})
export class ElasticModule {}
