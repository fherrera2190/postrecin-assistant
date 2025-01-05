import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ItemCart {
  name: string;
  quantity: number;
}

interface Cart {
  [key: string]: ItemCart;
}

interface CartState {
  cart: Cart;

  totalCart: () => void;

  addToCart: () => void;

  removeFromCart: () => void;

  clearCart: () => void;

  showCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: {},

      totalCart: () => set(() => ({})),

      clearCart: () => set({}),

      addToCart: () => set(() => ({})),
      showCart: () => set(() => ({})),
      removeFromCart: () => set(() => ({})),
    }),
    {
      name: "cart-storage",
    }
  )
);
