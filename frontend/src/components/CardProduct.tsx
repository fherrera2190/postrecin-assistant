import { useContext } from "react";
import { Product } from "../interfaces";
import { CardBody, CardFooter, CardHeader } from "./";
import ProductContext from "../context/product/ProductContext";
import CartContext from "../context/cart/CartContext";
import { useProduct } from "../hooks";

interface Props {
  product: Product;
}

export const CardProduct = ({ product }: Props) => {
  const { id, image, name, category, price } = product;
  const { state, manageProductInCart, removeFromCart } =
    useContext(CartContext);

  const { counter, increaseBy } = useProduct({
    manageProductInCart,
    removeFromCart,
    product,
    value: state[product.id]?.quantity || 0,
  });

  return (
    <ProductContext.Provider value={{ counter, increaseBy }}>
      <div className="card">
        <CardHeader id={id} image={image} />
        <CardBody name={name} category={category} />
        <CardFooter price={price} />
      </div>
    </ProductContext.Provider>
  );
};
