import { ProductInCart } from 'src/common/interfaces';

export class OrderItem {
  name: string;
  quantity: number;
  price: number;

  public constructor(product: ProductInCart) {
    this.name = product.name;
    this.price = product.price;
    this.quantity = product.quantity;
  }
}
