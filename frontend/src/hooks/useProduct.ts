import { useEffect, useState } from "react";
import { Product } from "../interfaces";
import { useCartStore } from "../stores/cart.store";

interface UseProductArgs {
  product: Product;
}
export const useProduct = ({ product }: UseProductArgs) => {
  const cart = useCartStore((state) => state.cart);

  const [counter, setCounter] = useState(0);
  // const [counter, setCounter] = useState(cart[product._id]?.quantity || 0);

  const manageProductInCart = useCartStore(
    (state) => state.manageProductInCart
  );

  const increaseBy = (value: number) => {
    const newValue = Math.max(0, counter + value);
    setCounter(newValue);
    manageProductInCart({ ...product, quantity: newValue });
  };

  useEffect(() => {
    setCounter(cart[product._id]?.quantity || 0);
  }, [cart, product._id]);

  return { counter, increaseBy };
};
