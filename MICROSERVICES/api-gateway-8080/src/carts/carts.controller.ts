import { Body, Controller, Get, Headers, Inject, Param, Post, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateCartsDto} from './req/create-cart.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('carts')
@Controller('carts')
export class CartsApiController {

    constructor(@Inject("PRODUCTS") private products: ClientProxy){}

    /**
      {
            "id": "14564223-3b22-42ea-ab71-498c9d199361",
            "image": "/products/belt-1.png",
            "title": "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
            "star": 4.5,
            "price": 19137,
            "isTopDeal": true,
            "isAuthentic": true,
            "shipping": {
            "type": "fast",
            "date": "3h"
            },
            "madeIn": "facilis"
        }
     */

    @Post("add-cart")
    async addCard(@Payload() body: CreateCartsDto, @Headers('Authorization') authorization ){
        console.log("add-cart loading........");
        let response = lastValueFrom(
            await this.products.send("createCart",{
                body: {...body}, 
                headers: { 'authorization': authorization }
            }));
        console.log("response add-cart:::" +response);
        return response;
    }

    @Post("update-cart")
    async updateCard(@Payload() body: CreateCartsDto, @Headers('Authorization') authorization ){
        console.log("update-cart loading........");
        let response = lastValueFrom(
            await this.products.send("createCart",{
                body: {...body}, 
                headers: { 'authorization': authorization }
            }));
        console.log("response update-cart:::" +response);
        return response;
    }

}
