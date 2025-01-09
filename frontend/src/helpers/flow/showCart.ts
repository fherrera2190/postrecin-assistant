import { Params } from "react-chatbotify";
import { useCartStore } from "../../stores/cart.store";
import { delay } from "../delay";

const showCartOptions = [
  "Agregar mas productos",
  "Agregar productos",
  "Confirmar pedido",
  "Volver al menu",
];

export const showCart = {
  show_cart: {
    message: async (params: Params) => {
      if (useCartStore.getState().totalQuantity() === 0) {
        await params.injectMessage("No tienes productos en tu carrito");
      } else {
        await params.injectMessage(`Productos en tu carrito:`);

        for (const productInCart of Object.values(
          useCartStore.getState().cart
        )) {
          await params.injectMessage(
            `${productInCart.quantity} x ${productInCart.name}`
          );
          await delay(1000);
        }

        await params.injectMessage(
          `Tu total es: $${useCartStore.getState().total()}`
        );
        // return "";
      }
    },
    options: () => {
      if (useCartStore.getState().totalQuantity() === 0) {
        return {
          items: showCartOptions.filter(
            (option) =>
              option !== "Confirmar pedido" &&
              option !== "Agregar mas productos"
          ),
        };
      }

      return {
        items: showCartOptions.filter(
          (option) => option !== "Agregar productos"
        ),
      };
    },

    chatDisabled: true,

    path: (params: Params) => {
      switch (params.userInput) {
        case "Agregar mas productos":
          return "show_products";
        case "Agregar productos":
          return "show_products";
        case "Confirmar pedido":
          return "confirm_purchase";
        default:
          return "getInstruction";
      }
    },
  },
};
