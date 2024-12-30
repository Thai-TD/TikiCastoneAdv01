import { Controller, Get, Headers, Inject, Post } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';
import { CreateOrderDto } from './req/create-order.dto';

@ApiBearerAuth()
@ApiTags('orders')
@Controller('orders')
export class OrdersController {

    constructor(
        @Inject("ORDERS") private orders: ClientProxy
    ){}

    @Post("create-order")
    createOrder(@Payload() body: CreateOrderDto, @Headers('Authorization') authorization ){
        console.log("createOrder list_product:::", body.list_product);
        console.log("createOrder authorization:::", authorization);
        let response = lastValueFrom(this.orders.send("createOrder",{
                    body: body, 
                    headers: { 'authorization': authorization }
                }
            ));
        console.log("createOrder end!!!" + response);
        return response;
    }

}
