import { Injectable } from '@nestjs/common';
import { PaymentsDto } from './dto/payments.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { request } from 'http';
import { randomUUID } from 'crypto';

@Injectable()
export class PaymentsService {

    constructor(private readonly prisma: PrismaService){}

    async payments(data){
        //load order id: body.order_id
        //load payments info
        //save payments - status
        try {
            const body = data.body;
            console.log("payments data: ", body)
            body.amount_paid = 99999;
            body.payment_date = new Date();
            body.payment_status = "SUCCESS";
            body.order_id = body.order_id;
            body.user_id = data.user.user_id;
            body.id = randomUUID();

            await this.prisma.payments.create({
                data: {...body}
            });
            return {
                errorCode: "0",
                errorMessage: "Payment Success"
              } 
        } catch (error) {
            console.log( "Something error happen:: " , error);
            return {
                errorCode: "0",
                errorMessage: "Something error happen:: " + error
              }
        }
      }
      
}
