import { Controller, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { lastValueFrom } from 'rxjs';
import { request } from 'http';

@Controller()
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService,
    @Inject("SHIPPING") private shipp: ClientProxy
  ) {
  }

  @MessagePattern('orderShipp')
  async orderShipp(@Payload() request) {
    console.log("ship was here")
    let response = lastValueFrom(await this.shipp.send("testShipping",{
      headers: { 'authorization': request.headers.authorization }
    })
    )
      return response;
  }

  @MessagePattern('createOrder')
  async create(@Payload() request) {
    let returnData =null;
    const order = await this.ordersService.create(request);
    console.log(order, " --- response create order")
    if(order && order.errorCode === "0") {
      const response = await this.shipp.send("sendShipper",{
        body: order.data,
        headers: { 'authorization': request.headers.authorization }
      }).subscribe(data => {
        console.log(data, " --- response shipping")

      });
      
    }
    return order;
  }

  @MessagePattern('findAllOrders')
  findAll() {
    return this.ordersService.findAll();
  }

  @MessagePattern('findOneOrder')
  findOne(@Payload() id: string) {
    return this.ordersService.findOne(id);
  }

  @MessagePattern('updateOrder')
  update(@Payload() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(updateOrderDto.id, updateOrderDto);
  }

  @MessagePattern('removeOrder')
  remove(@Payload() id: string) {
    return this.ordersService.remove(id);
  }
}
