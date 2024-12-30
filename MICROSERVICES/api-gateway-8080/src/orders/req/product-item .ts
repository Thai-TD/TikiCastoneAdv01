import { ApiProperty } from "@nestjs/swagger";

export class ProductItem {
    @ApiProperty({description: "ID product", type: String})
    id: string;

    @ApiProperty({description: "So luong", type: String})
    quantity: number;
}