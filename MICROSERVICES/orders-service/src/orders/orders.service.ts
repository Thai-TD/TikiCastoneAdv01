import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { StockService } from 'src/stock/stock.service';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { Quantity } from './dto/quantity.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService,
    private stockService: StockService,
    @Inject("PRODUCTS") private products: ClientProxy ,
    @Inject("SHIPPING") private shipping: ClientProxy ,
    @Inject("NOTIFY") private notify: ClientProxy,
    @Inject("PAYMENTS") private payments: ClientProxy,
   ){}

  async create(request) {
    let productsLimited = "";
    const body = request.body;
    
    let productIds = body.list_product.map(item => item.id);
    console.log("body .... ", body);
    const products = await lastValueFrom(this.products.send("findAllProductsByIds",{
      body: [...productIds],
      headers: { 'authorization': request.headers.authorization }
    } ));
   
    
    console.log("response products .... ", products);
    const resStock = await this.stockService.getStocks(productIds);
    console.log("body resStock .... ", resStock);
    if(resStock){
      body.list_product.forEach(item => {
        const check = resStock.find(o => o.product_id == item.id);
        let remain=check.quantity - item.quantity ;
        console.log(check, "check before update");
        check.quantity = remain;
        console.log(resStock, "check resStock after update");

        if(remain < 0){
          let product = products.find(p => p.id == item.id);
          if(productsLimited== "")
            productsLimited+=product.name + "- " + remain ;
          else
            productsLimited+="; "+product.name+ "- " + remain;
        }
      });
    }

    if(productsLimited !== "")
      return {
        errorCode: "ORD_100",
        errorMessage:"San pham khong ton tai hoac het hang hoac vuot qua so luong::: " + productsLimited 
      }

    try {
    //  await this.products.send("updateProduct", products);
      const stocks = [...resStock];
      console.log(stocks, " stocks data updating....");
      await this.stockService.updateStock(stocks);
    } catch (error) {
      throw new HttpException("Error when try to update products!", 101);
    }

    let orderID = "";
    let productData = null;
    try {
      // if(!body.cart_product_id){
      //   return {
      //     "errorCode": "ORD_101",
      //     "errorMessage": "Cart ID is missing"
      //   };
      // }
      body.status = "Avaiable";//check
      body.create_at = new Date();
      body.user_id = request.user.user_id;
      const order = await this.prisma.orders.create({
        data: this.dtoToEntity(body)
      });
      
      if(order){
        console.log(order, " :::: payments order");
        orderID = order.id;
        productData = {
          products: products,
          order_id: orderID,
          email : request?.body?.email ? request.body.email : "noemail@gmail.com",
          address : request?.body?.address ? request.body.address : "no address",
          phone : request?.body?.phone ? request.body.phone : request.user.user_name,
        }
        //payment
        const payment ={
          order_id: order.id
        }
        console.log(payment, " :::: payments data request");
        const payments = lastValueFrom(await this.payments.send("paymentsForOrders", {
          body: payment,
          headers: { 'authorization': request.headers.authorization }
        }));
        console.log(payments, " :::: payments data response");
        if(!payments){
          return {
            "errorCode": "ORD_103",
            "errorMessage": "Error while executing payments"
          };
        }

        //update stock
        const stocks = [...resStock];
        console.log(stocks, " stocks data updating....");
        const stockRes = await this.stockService.updateStock(stocks);
        console.log(stockRes, " stock Response");
      }
    } catch (error) {
      console.log(error, " payment happen errors");
    }

    //shipping testShipping sendShippingRequest
    // try {
    //   console.log(" shipping processing...." + process.env.RABITMQ_SHIPPING_QUEUE);
    //   const responseShip = await this.shipping.send("sendShippingRequest", {
    //     body: products,
    //     headers: { 'authorization': request.headers.authorization}
    //   });
    //   console.log("Sent shipping service testShipping:: ", responseShip);
    //  } catch (error) {
    //    throw new HttpException("Error when try to sendShipping!", 101);
    //  }
    //notify
    try {
      
      console.log(products, " sending email....");
      const res = await this.notify.send("sendEmail1", {
        body: productData,
        headers: { 'authorization': request.headers.authorization}
      }).subscribe(data => {
        console.log(data, " --- response sendEmail1")
        return data;
      });
     } catch (error) {
       throw new HttpException("Error when try to sendEmail!", 101);
     }

    console.log(products, " Order success!....");
    return {
      "errorCode": "0",
      "errorMessage": "Order success!!!",
      "data": {
        products: products,
        order_id: orderID,
        email : request?.body?.email ? request.body.email : "noemail@gmail.com",
        address : request?.body?.address ? request.body.address : "no address",
        phone : request?.body?.phone ? request.body.phone : request.user.user_name,
      }
    }
  }

  async findAll() {
    return await this.prisma.orders.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.orders.findFirst({
      where: {id}
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return await this.prisma.orders.update({
     where: {id},
     data: this.dtoToEntity(updateOrderDto)
   });
 }

 async updateByStatus(id: string, updateOrderDto: UpdateOrderDto) {
  return await this.prisma.orders.update({
      where: {id},
      data: this.dtoToEntity(updateOrderDto)
    });
  }

  async remove(id: string) {
    return await this.prisma.orders.delete({
      where: {id}
    });
  }

  dtoToEntity(updateOrderDto: UpdateOrderDto){
    return  {
      id: updateOrderDto.id ? updateOrderDto.id : randomUUID(),
  
      user_id: updateOrderDto.user_id ? updateOrderDto.user_id : null,
  
      list_product: JSON.stringify(updateOrderDto.list_product),
  
      create_at: updateOrderDto.create_at,
  
      update_at: new Date(),
  
      status: updateOrderDto.status,
      
    }
  }
}
