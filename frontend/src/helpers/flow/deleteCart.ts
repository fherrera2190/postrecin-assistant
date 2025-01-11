import { Params } from "react-chatbotify";
import { useCartStore } from "../../stores/cart.store";
import { ChatbotService } from "../../service/ChatbotService.service";
import { AxiosError } from "axios";

export const deleteCart = {
  delete_cart: {
    message: async (params: Params) => {
      if (useCartStore.getState().totalQuantity() < 1) {
        await params.injectMessage("You have no products in your order!! 😔");
        await params.goToPath("getInstruction");
        return;
      }

      return "Are you sure you want to empty your cart/order?";
    },

    path: async (params: Params) => {
      try {
        const instruction = await ChatbotService.GetIntructions(
          params.userInput.trim()
        );

        switch (instruction) {
          case "yes": {
            useCartStore.getState().clearCart();
            const response = await ChatbotService.GetResponse(
              `user clears cart`
            );
            await params.injectMessage(response);
            return "getInstruction";
          }
          case "no":
            return "getInstruction";
          default:
            await params.injectMessage("I didn’t understand your answer.");
            return;
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.response?.data);
        }
        await params.injectMessage("I something went wrong.");
        return "getInstruction";
      }
    },
  },
};
