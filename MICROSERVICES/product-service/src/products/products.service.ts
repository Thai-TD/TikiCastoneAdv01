import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService, private redis: RedisService){}
  async create(createProductDto: CreateProductDto) {
    return this.prisma.products.create({
      data: createProductDto
    });
  }

  async findAll(body) {
    return await this.prisma.products.findMany();
  }
  
  async findByPagination(body) {
    let {name, pageNo, pageSize} = body;
    pageSize = Number(pageSize);
    pageNo = Number(pageNo);
    let index = pageSize * (pageNo-1); 
    const key = "Products_" + name+"_" + pageNo + "_" + pageSize;
    const data = await this.redis.getCache(key);
    if(data)
      return data;
    const foods = await this.prisma.products.findMany({
      where: {
        title: {
          contains: name,
          mode: 'insensitive',
        }
      },
      skip: index,
      take: pageSize
    });
    
    //save cache
    this.redis.saveCache(foods, key);
    return foods;
  }

  async findOne(id: string) {
    return await this.prisma.products.findFirst({
      where: {id}
    })
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.products.update({
      where:{id},
      data: updateProductDto
    });
  }

  async remove(id: string) {
    return this.prisma.products.delete({
      where:{id}
    });
  }
  async findAllByIds(data){
    
    console.log("user" + data.user.user_name + "product ids :::", data.body);
    return await this.prisma.products.findMany({
      where: {
        id: {
          in: data.body
        }
      } 
    });
  }
}
