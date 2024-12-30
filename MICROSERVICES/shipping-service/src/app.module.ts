import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShippingService } from './shipping/shipping.service';
import { ShippingController } from './shipping/shipping.controller';
import { ShippingModule } from './shipping/shipping.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), ShippingModule, PrismaModule,AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
