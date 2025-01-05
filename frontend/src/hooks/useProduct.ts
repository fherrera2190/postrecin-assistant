import {  useEffect, useState } from "react";
import { Product, ProductInCart } from "../interfaces";

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
  const [counter, setCounter] = useState(value);

  const increaseBy = (value: number) => {
    const newValue = Math.max(0, counter + value);
    setCounter(newValue);
    manageProductInCart({ ...product, quantity: newValue });
  };

  useEffect(() => {
    setCounter(0);
  }, []);

  return { counter, increaseBy };
};
