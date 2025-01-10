import { Product } from 'src/products/entities/product.entity';

export interface ProductInCart extends Partial<Product> {
  quantity: number;
}
