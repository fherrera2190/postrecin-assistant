import { useEffect, useReducer, useState } from "react";
import { CartState, Product, ProductInCart } from "../interfaces";
import { cartReducer } from "../context";


const INITIAL_STATE: CartState = {};

const init = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : INITIAL_STATE;
};
export const useCart = () => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE, init);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const manageProductInCart = (productInCart: ProductInCart) => {
    dispatch({ type: "MANAGE_PRODUCT_IN_CART", payload: productInCart });
  };

  const removeFromCart = (product: Product) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: product.id });
  };

  useEffect(() => {
    const productsInCart: ProductInCart[] = Object.values(state);

    const calculateTotal = productsInCart.reduce(
      (acc: number, product) => acc + product.price * product.quantity,
      0
    );

    const calculateQuantity = productsInCart.reduce(
      (acc: number, product) => acc + product.quantity,
      0
    );

    setTotal(calculateTotal);
    setQuantity(calculateQuantity);
  }, [state]);

  return { state, manageProductInCart, removeFromCart, total, quantity };
};
