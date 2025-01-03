import { useContext, useEffect, useState } from "react";
import { Product, ProductInCart } from "../interfaces";
import CartContext from "../context/cart/CartContext";

interface UseProductArgs {
  manageProductInCart: (product: ProductInCart) => void;
  removeFromCart: (product: Product) => void;
  value?: number;
  product: Product;
}

export const useProduct = ({
  manageProductInCart,
  product,
  value = 0,
}: UseProductArgs) => {
  const { state } = useContext(CartContext);
  const [counter, setCounter] = useState(value);

  
  const increaseBy = (value: number) => {
    const newValue = Math.max(0, counter + value);
    setCounter(newValue);
    manageProductInCart({ ...product, quantity: newValue });
  };
  
  useEffect(() => {
    if (state[product.id]?.quantity > 0) return;
    setCounter(0);
  }, [state[product.id]]);
  
  return { counter, increaseBy };
};
