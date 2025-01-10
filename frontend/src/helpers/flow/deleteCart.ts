import { Params } from "react-chatbotify";
import { useCartStore } from "../../stores/cart.store";
import { delay } from "../delay";
import { ChatbotService } from "../../service/ChatbotService.service";

export const deleteCart = {
  delete_cart: {
    message: async (params: Params) => {
      if (useCartStore.getState().totalQuantity() < 1) {
        await params.injectMessage("No tienes productos en tu pedido!!");
        await params.goToPath("getInstruction");
        return;
      }

      return "Estas seguro de querer vaciar tu carrito/pedido?";
    },

    path: async (params: Params) => {
      const instruction = await ChatbotService.GetIntructions(
        params.userInput.trim()
      );

      switch (instruction) {
        case "yes":
          useCartStore.getState().clearCart();
          await params.injectMessage("Se ha eliminado tu pedido 😢");
          await delay(1000);
          return "getInstruction";
        case "no":
          return "getInstruction";
        default:
          await params.injectMessage("No entendi tu respuesta");
          return;
      }
    },
  },
};
