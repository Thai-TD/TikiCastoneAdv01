import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Payload } from '@nestjs/microservices';

@Injectable()
export class ElasticProductsService {

    constructor(private elastic: ElasticsearchService){}

    async seachProducts(productName) {
        let data = this.elastic.search({
            index: "products_index",
            query: {
                match:{
                    name: productName
                }
            }
        })
        return data; 
    }
}
