import { CartState, ProductInCart } from "../../interfaces";

type Action =
  | {
      type: "MANAGE_PRODUCT_IN_CART";
      payload: ProductInCart;
    }
  | {
      type: "REMOVE_FROM_CART";
      payload: string;
    };

export const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case "MANAGE_PRODUCT_IN_CART": {
      if (action.payload.quantity === 0) {
        const { [action.payload.id]: toDelete, ...rest } = state;
        localStorage.setItem("cart", JSON.stringify(rest));
        void toDelete;
        return rest;
      }

      const newState = {
        ...state,
        [action.payload.id]: action.payload,
      };
      localStorage.setItem("cart", JSON.stringify(newState));

      return newState;
    }

    case "REMOVE_FROM_CART": {
      const { [action.payload]: toDelete, ...rest } = state;
      void toDelete;
      localStorage.setItem("cart", JSON.stringify(rest));

      return rest;
    }

    default:
      return state;
  }
};
