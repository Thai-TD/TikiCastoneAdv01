import { Body, Controller, Get, Headers, Inject, Param, Post, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './req/create-products.dto';

@ApiBearerAuth()
@ApiTags('products')
@Controller('products')
export class ProductsApiController {

    constructor(@Inject("PRODUCTS") private products: ClientProxy){}

    @Get()
    async getProducts(@Payload() body, @Headers('Authorization') authorization ){
        console.log("authorization getProducts:::" +authorization);
        let response = lastValueFrom(await this.products.send("findAllProducts",{
                    headers: { 'authorization': authorization }
                })
            );
        console.log("response getProducts:::" +response);
        return response;
    }

    @Post("create-product")
    async createProducts(@Payload() body:CreateProductDto, @Headers('Authorization') authorization ){
        console.log("authorization createProducts:::" +authorization);
        let response = lastValueFrom(await this.products.send("createProduct",{
                    headers: { 'authorization': authorization }
                })
            );
        console.log("response createProducts:::" +response);
        return response;
    }


    @Get("find-by-pagination")
    async findFoodsPagination(@Query("name") name, @Query("pageNo") pageNo, @Query("pageSize") pageSize,@Headers('Authorization') authorization ){
        console.log("name:::" +name + " pageNo:::" +pageNo);
        // let response = lastValueFrom(await this.products.send("findFoodsPagination",{name:name,pageNo:pageNo,pageSize:pageSize}));
        let response =lastValueFrom(this.products.send('findProductsPagination',
            { name: name, pageNo: pageNo, pageSize: pageSize, headers: { 'authorization': authorization }},
          )
        );
        console.log("response findProductsPagination:::" +response);
        return response;
    }

        
    @Get("{id}")
    async findOneFood(@Param("id") id){
        console.log("findOneProduct loading........");
        let response = lastValueFrom(await this.products.send("findOneProduct",{id:id}));
        console.log("response findOneProduct:::" +response);
        return response;
    }

}
