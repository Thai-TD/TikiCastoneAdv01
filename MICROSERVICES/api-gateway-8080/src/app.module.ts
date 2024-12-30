import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
// import { FoodsApiController} from './products/foods.controller';
import { OrdersController } from './orders/orders.controller';
import { ConfigModule } from "@nestjs/config";
import { UsersController } from './users/users.controller';
import { ProductsApiController } from "./products/products.controller";
import { CartsApiController } from "./carts/carts.controller";
// import { ShippingController } from './shipping/shipping.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }), 
    ClientsModule.register([
      {
        name: "PRODUCTS",
        transport: Transport.RMQ,
        options:{
          urls: [process.env.RABITMQ_URL],
          queue: process.env.RABITMQ_PRODUCTS_QUEUE,
          queueOptions:{
            durable:false
          }
        }
      },
      {
        name: "USERS",
        transport: Transport.RMQ,
        options:{
          urls: [process.env.RABITMQ_URL],
          queue: process.env.RABITMQ_USERS_QUEUE,
          queueOptions:{
            durable:false
          }
        }
      },
      {
        name: "ORDERS",
        transport: Transport.RMQ,
        options:{
          urls: [process.env.RABITMQ_URL],
          queue: process.env.RABITMQ_ORDERS_QUEUE,
          queueOptions:{
            durable:false
          }
        }
      },
      {
        name: "SHIPPING",
        transport: Transport.RMQ,
        options:{
          urls: [process.env.RABITMQ_URL],
          queue: process.env.RABITMQ_SHIPPING_QUEUE,
          queueOptions:{
            durable:false
          }
        }
      }
    ]),
  ],
  controllers: [
    CartsApiController, 
    OrdersController,
  UsersController,
  ProductsApiController,
  // ShippingController
  ],
  providers: [],
})
export class AppModule {}
