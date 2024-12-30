import { ApiProperty } from "@nestjs/swagger";

export class CreateCartsDto {

    @ApiProperty({description: "ID", type: Number})
    id: number;

    @ApiProperty({description: "ID", type: Number})
    user_id: string;

    @ApiProperty({description: "list product", type: String})
    product_data: string;
}
