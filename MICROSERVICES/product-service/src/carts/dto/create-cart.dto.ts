import { InputJsonValue, Record } from "@prisma/client/runtime/library";

export class CreateCartDto {
    id: string;
    user_id:string;
    product_data: string;
}
