import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@Controller()
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @MessagePattern('createCart')
  create(@Payload() createCartDto) {
    return this.cartsService.create(createCartDto);
  }

  @MessagePattern('findAllCarts')
  findAll() {
    return this.cartsService.findAll();
  }

  @MessagePattern('findOneCart')
  findOne(@Payload() id: string) {
    return this.cartsService.findOne(id);
  }

  @MessagePattern('updateCart')
  update(@Payload() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(updateCartDto.id, updateCartDto);
  }

  @MessagePattern('removeCart')
  remove(@Payload() id: string) {
    return this.cartsService.remove(id);
  }
}
