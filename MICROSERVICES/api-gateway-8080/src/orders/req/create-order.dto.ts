import { ApiProperty } from "@nestjs/swagger";
import { ProductItem } from "./product-item ";

/**

 */
export class CreateOrderDto {

    @ApiProperty({description: "ID", type: Number})
    id: string;

    @ApiProperty({description: "user id", type: String})
    user_id: string;

    @ApiProperty({description: "list product", type: [ProductItem]})
    list_product: ProductItem[];

    @ApiProperty({description: "email nhan thong bao don hang", type: String})
    email: string;

    @ApiProperty({description: "Dia chi nhan hang", type: String})
    address: string;

    @ApiProperty({description: "Dia chi nhan hang", type: String})
    phone: string;

    @ApiProperty({description: "create at", type: String})
    create_at: string;

    @ApiProperty({description: "status", type: String})
    status: string;

    @ApiProperty({description: "update at", type: String})
    update_at: string;
}

