import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
// import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt.auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.SECRET_KEY,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [{useClass: JwtAuthGuard, provide:APP_GUARD}]//JwtStrategy,
})
export class AuthModule { }
