// import { Controller, Get, Headers, Inject } from '@nestjs/common';
// import { ClientProxy } from '@nestjs/microservices';
// import { lastValueFrom } from 'rxjs';

// @Controller('shipping')
// export class ShippingController {

//     constructor(@Inject("SHIPPING") private shipp: ClientProxy,
//     @Inject("ORDERS") private order: ClientProxy){}

//     @Get()
//     async test( @Headers('Authorization') authorization ){

//     let response1 = lastValueFrom(await this.order.send("orderShipp",{
//         headers: { 'authorization': authorization }
//     })
// );
//         return response1;
//     }

// }
