import { createContext } from "react";

interface ProductContextProps {
  counter: number;
  increaseBy: (value: number) => void;
}

const ProductContext = createContext({} as ProductContextProps);
export default ProductContext;
