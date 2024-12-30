import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {

    @ApiProperty({description: "ID food", type: Number})
    id: number;

    @ApiProperty({description: "name food", type: String})
    name: string;

    @ApiProperty({description: "Dia chi quan an", type: String})
    address: string;

    @ApiProperty({description: "anh minh hoa", type: String})
    img: string;

    @ApiProperty({description: "The loai", type: String})
    kind: string;

    @ApiProperty({description: "so luong", type: String})
    quantity: number;

    @ApiProperty({description: "Trang thai", type: String})
    status: string

}
