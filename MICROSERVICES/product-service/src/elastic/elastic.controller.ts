import { Controller } from '@nestjs/common';
import { ElasticService } from './elastic.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ElasticController {

    constructor(private elastic: ElasticService){}

    @MessagePattern('elastic.product.findAll')
    async findAll(@Payload() body) {
      return await this.elastic.findALl(body);
    }

}
