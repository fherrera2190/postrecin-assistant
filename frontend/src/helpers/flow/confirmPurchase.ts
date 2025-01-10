import { Params } from "react-chatbotify";
import { ChatbotService } from "../../service/ChatbotService.service";
import { delay } from "../delay";
import { useCartStore } from "../../stores/cart.store";
import { OrdersService } from "../../service/OrdersService.service";
import { AxiosError } from "axios";

export const confirmPurchase = {
  confirm_purchase: {
    message: "Estas seguro de querer confirmar el pedido?",
    options: ["Si", "No"],
    path: async (params: Params) => {
      try {
        const instruction = await ChatbotService.GetIntructions(
          params.userInput.trim()
        );

        switch (instruction) {
          case "yes": {
            await params.injectMessage("Muchas gracias por tu compra!!");
            const cartState = useCartStore.getState().cart;
            const cart = Object.values(cartState);
            const order = await OrdersService.createOrder(cart);
            const response = await ChatbotService.GetResponse(
              `show order to customer ${order}`
            );
            console.log(response);
            await delay(1000);
            return "getInstruction";
          }
          case "no":
            return "getInstruction";
          default:
            await params.injectMessage("No entendi tu respuesta");
            return;
        }
      } catch (error) {
        //console.log(error);
        if (error instanceof AxiosError) {
          console.log(error.response?.data);
          throw new Error(error.response?.data);
        }
      }
    },
  },
};
