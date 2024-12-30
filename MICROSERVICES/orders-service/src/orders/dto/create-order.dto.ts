import { Quantity } from "./quantity.dto";


export class CreateOrderDto {
  id: string;

  user_id: string;

  list_product: Quantity[]; 

  create_at: Date;

  status: string;
  
  update_at: Date;

  cart_product_id: string;
}
