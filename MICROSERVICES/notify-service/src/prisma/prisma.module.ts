import { Module, Global, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Global()
@Module({
    providers:[PrismaModule],
    exports:[PrismaModule]
})
export class PrismaModule extends PrismaClient{
}
