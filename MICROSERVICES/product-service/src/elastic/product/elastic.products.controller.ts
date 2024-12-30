import { Body, Controller, HttpCode, Query } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Controller('elastic')
export class ElasticProductsController {

    constructor(private elastic: ElasticsearchService){}


}