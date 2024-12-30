import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {

    constructor(private redis: RedisService){}

    @MessagePattern("clearCacheProducts")
    async clearCache(@Payload() params){
        return this.redis.clearCache(params);
    }

}
