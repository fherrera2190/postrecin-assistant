import { createContext } from "react";
import { CartState, Product, ProductInCart } from "../../interfaces";

interface CartContextProps {
  state: CartState;
  manageProductInCart: (product: ProductInCart) => void;
  removeFromCart: (product: Product) => void;
  total: number;
  quantity: number;
}

const CartContext = createContext({} as CartContextProps);

export default CartContext;
