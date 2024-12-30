import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {

    constructor(@Inject(CACHE_MANAGER) private cache: Cache){}

    async saveCache(data, index){
        await this.cache.set(index,data);
    }

    async getCache(index){
        return await this.cache.get(index);
    }

    async clearCache(params){
        let {index} = params;
        if(index){
            await this.cache.del(index);
        }else{
            await this.cache.reset();
        }
    }
}
