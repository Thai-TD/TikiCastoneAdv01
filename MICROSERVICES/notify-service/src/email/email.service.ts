import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
 

  sendEmail(data){
    try {
      console.log("send email processing... !",JSON.stringify(data.body));
      //notify => gui mail cho user
      let configEmail = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "emailno095@gmail.com",
                pass: "xlxupnczwecoggkf"
            }
        });

      let productsName = data.body.products.map(item => item.title).join(', ');
      console.log("productsName ::!",productsName);
      let info = {
          from: "emailno095@gmail.com",
          to: data.body.email,
          subject: "Xác nhận đơn hàng Tiki!",
          html:"<h1> Đặt hàng thành công đơn hàng: </h1>" 
          + "<b>Mã giao dịch: </b>" + data.body.order_id + "<br>" 
          + "<b>Sản phẩm: </b>" + productsName
      }

      configEmail.sendMail(info, error => error);
      console.log("send email success!");
    } catch (error) {
      console.log("send email error!", error);
    }
    
  }
}
