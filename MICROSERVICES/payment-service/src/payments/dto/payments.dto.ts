import { Decimal } from "@prisma/client/runtime/library";
import { Timestamp } from "rxjs";

export class PaymentsDto{
    id: string;
    cart_product_id: string;
    amount_paid: number;
    payment_method: string;
    payment_status: string;
    payment_date: Date;
    payment_details: string;
    order_id: string

}