import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { StockModule } from 'src/stock/stock.module';
import { StockService } from 'src/stock/stock.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const PRODUCTS = {
  provide: 'PRODUCTS',
  useFactory: () => {
    try {
      const client = ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABITMQ_URL],
          queue: process.env.RABITMQ_PRODUCTS_QUEUE,
          queueOptions: {
              durable: false
          }
        },
      });
      return client;
    } catch (error) {
      console.error('Failed to create TCP client:', error);
      throw error;
    }
  },
};

export const SHIPPING = {
  provide: 'SHIPPING',
  useFactory: () => {
    try {
      const client = ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RABITMQ_URL],
            queue: process.env.RABITMQ_SHIPPING_QUEUE,
            queueOptions: {
                durable: false
            }
        }
      });
      return client;
    } catch (error) {
      console.error('Failed to create TCP client:', error);
      throw error;
    }
  },
};

export const NOTIFY = {
  provide: 'NOTIFY',
  useFactory: () => {
    try {
      const client = ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABITMQ_URL],
          queue: process.env.RABITMQ_NOTIFY_QUEUE,
          queueOptions: {
              durable: false
          }
        },
      });
      return client;
    } catch (error) {
      console.error('Failed to create TCP client:', error);
      throw error;
    }
  },
};

export const PAYMENTS = {
  provide: 'PAYMENTS',
  useFactory: () => {
    try {
      const client = ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABITMQ_URL],
          queue: process.env.RABITMQ_PAYMENTS_QUEUE,
          queueOptions: {
              durable: false
          }
        },
      });
      return client;
    } catch (error) {
      console.error('Failed to create TCP client:', error);
      throw error;
    }
  },
};

@Module({
  controllers: [OrdersController],
  providers: [OrdersService,StockService,
    PRODUCTS,SHIPPING,NOTIFY,PAYMENTS],
  imports:[]
})
export class OrdersModule {}
