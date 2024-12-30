import { Module } from '@nestjs/common';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EmailModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),EmailModule //,AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
