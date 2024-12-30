import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Cache } from 'cache-manager';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class ElasticService {

    constructor(private elastic: ElasticsearchService, private redisService: RedisService) { }

    async findALl(body) {
        //id auto
        await this.elastic.index({
            index: "products_index",
            document: {
                name: "products"
            },
            refresh: true
        })

        // await this.elastic.update({
        //     index: "products_index",
        //     id: 1,
        //     doc: {
        //         name: "products"
        //     },
        //     refresh: true //lam moi lai index
        // })

        // await this.elastic.delete({
        //     index: "products_index",
        //     id: 1,
        //     refresh: true //lam moi lai index
        // })

        let data = await this.elastic.search({
            index: "products"
        })

        return data;
    }

    async searchProduct(query: string) {
        const cacheData = await this.redisService.getCache("products_"+query);
        if(cacheData){
            return cacheData;
        }
        const body = this.elastic.search({
            index: "products",
            body: {
                query: {
                    match: {
                        name: "query"
                    }
                }
            }
        });

        //save cache
        this.redisService.saveCache(body,"products_"+query);
        return body;
    }
}
