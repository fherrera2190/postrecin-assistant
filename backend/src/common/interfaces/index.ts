import { Product } from 'src/products/entities/product.entity';

export interface ProductInCart extends Pick<Product, 'name' | 'price'> {
  _id?: string;
  quantity: number;
}
