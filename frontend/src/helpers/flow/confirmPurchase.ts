import { Params } from "react-chatbotify";
import { ChatbotService } from "../../service/ChatbotService.service";
import { useCartStore } from "../../stores/cart.store";
import { OrdersService } from "../../service/OrdersService.service";
import { AxiosError } from "axios";

export const confirmPurchase = {
  confirm_purchase: {
    message: async (params: Params) => {

      if (useCartStore.getState().totalQuantity() < 1) {
        await params.injectMessage("You have no products in your cart!! 😔");
        await params.goToPath("getInstruction");
        return;
      }

      return "Are you sure you want to confirm your order?";
    },
    path: async (params: Params) => {
      try {
        const instruction = await ChatbotService.GetIntructions(
          params.userInput.trim()
        );

        switch (instruction) {
          case "yes": {
            const cartState = useCartStore.getState().cart;
            const cart = Object.values(cartState);
            const order = await OrdersService.createOrder(cart);

            console.log(order);
            const response = await ChatbotService.GetResponse(
              `show order to customer ${JSON.stringify(order)}`
            );
            useCartStore.getState().clearCart();
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
          throw new Error(error.response?.data);
        }
        await params.injectMessage("I something went wrong.");
        return "getInstruction";
      }
    },
  },
};
