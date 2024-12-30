import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { RedisService } from 'src/redis/redis.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { randomUUID } from 'crypto';

@Injectable()
export class CartsService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService){}

  create(data: any) {
    console.log(data, "card data");
    const user = data.user;
    const body = data.body;
    body.user_id = user.user_id;
    body.id = randomUUID();
    return this.prisma.cart_product.create({
      data: body
    });
  }

  findAll() {
    return this.prisma.cart_product.findMany();
  }

  findOne(id: string) {
    return this.prisma.cart_product.findFirst({
      where: {id}
    });
  }

  update(id: string, updateCartDto: UpdateCartDto) {
    return this.prisma.cart_product.update({
      where: {id},
      data: updateCartDto
    });
  }

  remove(id: string) {
    return this.prisma.cart_product.delete({
      where: {id}
    });
  }
}
