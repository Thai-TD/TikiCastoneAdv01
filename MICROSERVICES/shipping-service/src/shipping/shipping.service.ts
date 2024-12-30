import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShippingService {

  constructor(private prisma: PrismaService){}

  async saveShippingInfo(data) {
    console.log("Shipping data::: ", data);
    const body = data.body;
    //todo get random shipper free time - ready
    let shipper = await this.prisma.shipper.findFirst({
      where: {status: "Pending"}
    });
    console.log("Shipping by shipper ::: ", JSON.stringify(shipper));
    try {
      let reponse = await this.prisma.shipping.create({
        data: {
          full_name: data.user.full_name ? data.user.full_name : "",
          email: body.email,
          phone: body.phone,
          address: body.address,
          create_at: new Date(),
          order_id: body.order_id,
          shipper_id: shipper.id
        }
      });
      console.log("Shiping success!!! ::: ");
      return {
        "errorCode": "0",
        "errorMessage": "Shiping success!!!",
        "data": reponse
      }
    } catch (error) {
      console.log("shiping donee!" + error)
      return {
          "errorCode": "0",
          "errorMessage": "Shiping Error:::" + error
      }
    }
   
  }

}
