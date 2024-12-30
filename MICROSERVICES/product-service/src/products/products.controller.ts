import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern('createProduct')
  async create(@Payload() createProductDto: any) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern('findProductsPagination')
  async findFoodsPagination(@Payload() body) {
    console.log("findProductsPagination processing...........");
    return await this.productsService.findByPagination(body);
  }

  @MessagePattern('findAllProducts')
  async findAll(@Payload() body:any) {
    return this.productsService.findAll(body);
  }

  @MessagePattern('findOneProduct')
  async findOne(@Payload() id: string) {
    return await this.productsService.findOne(id);
  }

  @MessagePattern('updateProduct')
  async update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  @MessagePattern('removeProduct')
  async remove(@Payload() id: string) {
    return this.productsService.remove(id);
  }

  @MessagePattern('findAllProductsByIds')
  async findAllByIds(@Payload() data) {
    console.log("get products processing.... ");
    return await this.productsService.findAllByIds(data);
  }
}
