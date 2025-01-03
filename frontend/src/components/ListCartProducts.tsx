import { ProductInCart } from "../interfaces";
import { CartProduct } from "./";

interface Props {
  productsInCart: ProductInCart[];
}

export const ListCartProducts = ({ productsInCart }: Props) => {
  return (
    <>
      {productsInCart.map((product: ProductInCart) => (
        <CartProduct key={product.id} product={product} />
      ))}
    </>
  );
};
