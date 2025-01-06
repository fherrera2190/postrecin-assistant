export interface Product {
  _id: string;
  image: ProductImage;
  name: string;
  category: string;
  price: number;
}

export interface ProductImage {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface ProductInCart extends Product {
  quantity: number;
}
