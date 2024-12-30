
export class ShippingDto {
  type: string;
  date: string;
}

export class CreateProductDto {

  id: string;

  image: string;

  title: string;

  star?: number;

  price: number;

  istopdeal: boolean;

  isauthentic: boolean;

  shipping: string;

  madein: string;
}
