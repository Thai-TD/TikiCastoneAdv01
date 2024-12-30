import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StockService {

    constructor(private prisma: PrismaService){}

    async checkQuantity(product_id){

        try {
            console.log("check Quantity:: " , product_id);
            const data = await this.prisma.stock.findFirst({
                where:{product_id}
            });
    
            if(data && data.quantity > 0){
                return true;
            }
        } catch (error) {
            console.log("error while get quantity:: " , error);
            return false;
        }
    }

    async getStocks(productIds){
        console.log("get stock:: " , productIds);
        try {
            const data = await this.prisma.stock.findMany({
                where:{
                    product_id:{
                        in: productIds
                    }
                }
            });
            return data;
        } catch (error) {
            console.log("error while get quantity:: " , error);
            return null;
        }
    }

    async updateStock(stocks){
        try {
            console.log("stock update data:::", stocks);
            const stocksUpdate = stocks.map(data => {
                return this.prisma.stock.updateMany({
                    where: { id: data.id },
                    data: data
                });
            });
            const rs = await Promise.all(stocksUpdate);
            console.log("stock update rs data:::", rs);
            return {
                "errorCode": "0",
                "errorMessage": "Update Stock success!",
                "result": rs,
            };
        }
        catch (error) {
            console.log(error, " ::: update stock erros");
            return {
                "error": error
            };
        }
    }
}
