import { Quantity } from "./quantity.dto";
export class CreateOrderDetailDto {
    delivered_by: string;

    item_name: string;

    item_image: Quantity[]; 

    item_quantity: Date;

    item_seller: string;
  
    order_status: string;

    order_id: string;

    created_at: Date;
    updated_at: Date;

    order_detail: CreateOrderDetailDto
}
