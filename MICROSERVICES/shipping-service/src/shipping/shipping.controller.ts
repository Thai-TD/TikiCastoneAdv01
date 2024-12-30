import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ShippingService } from './shipping.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@Controller()
export class ShippingController {

    constructor(private shipping: ShippingService){}


    @MessagePattern("sendShipper")
    async sendShip(@Payload() data){
        return await this.shipping.saveShippingInfo(data);
    }
    @MessagePattern("testShipping")
    async testShipping(@Payload() data){
        return "Hello from shipping service 123!";
    }
}
