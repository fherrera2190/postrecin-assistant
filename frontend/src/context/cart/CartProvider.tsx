import { useCart } from "../../hooks";
import CartContext from "./CartContext";


interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export const CartProvider = ({ children }: Props) => {
  const { state, manageProductInCart, removeFromCart, total, quantity } = useCart();

  return (
    <CartContext.Provider
      value={{ state, manageProductInCart, removeFromCart, total, quantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
