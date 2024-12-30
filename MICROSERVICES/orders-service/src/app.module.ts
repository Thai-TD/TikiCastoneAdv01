import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';
import { StockModule } from './stock/stock.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true
    }), OrdersModule, StockModule,PrismaModule,AuthModule,
    ClientsModule.register([
        {
            name: "PRODUCTS",
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABITMQ_URL],
                queue: process.env.RABITMQ_PRODUCTS_QUEUE,
                queueOptions: {
                    durable: false
                }
            }
        },
        {
            name: "SHIPPING",
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABITMQ_URL],
                queue: process.env.RABITMQ_SHIPPING_QUEUE,
                queueOptions: {
                    durable: false
                }
            }
        },
        {
            name: "NOTIFY",
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABITMQ_URL],
                queue: process.env.RABITMQ_NOTIFY_QUEUE,
                queueOptions: {
                    durable: false
                }
            }
        },
        {
            name: "PAYMENTS",
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABITMQ_URL],
                queue: process.env.RABITMQ_PAYMENTS_QUEUE,
                queueOptions: {
                    durable: false
                }
            }
        }
    ])],
    controllers: [],
    providers: [],
})
export class AppModule { }
