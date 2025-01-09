import { ProductInCart } from 'src/common/interfaces';

export class CreateProductDto {
  userId: string;
  cart: ProductInCart[];
}
