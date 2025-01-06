import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductInCart } from "../interfaces";

interface Cart {
  [key: string]: ProductInCart;
}

interface CartState {
  cart: Cart;

  total: () => number;
  totalQuantity: () => number;

  manageProductInCart: (productInCart: ProductInCart) => void;

  removeFromCart: (_id: string) => void;

  clearCart: () => void;

  showCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: {},

      clearCart: () => set({ cart: {}}),

      manageProductInCart: (productInCart: ProductInCart) =>
        set((state) => {
          if (productInCart.quantity === 0) {
            const { [productInCart._id]: _, ...rest } = state.cart;
            void _;

            return { cart: rest };
          }
          return {
            cart: { ...state.cart, [productInCart._id]: productInCart },
          };
        }),
      showCart: () => set(() => ({})),
      removeFromCart: (_id: string) =>
        set((state) => {
          const { [_id]: _, ...rest } = state.cart;
          void _;
          return { cart: rest };
        }),
      total: () => {
        const total = Object.values(get().cart).reduce(
          (total, { quantity, price }) => total + quantity * price,
          0
        );

        return total;
      },
      totalQuantity: () => {
        const totalQuantity = Object.values(get().cart).reduce(
          (totalQuantity, { quantity }) => totalQuantity + quantity,
          0
        );
        return totalQuantity;
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
