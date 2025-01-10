import { Params } from "react-chatbotify";
import { ChatbotService } from "../../service/ChatbotService.service";

const menuOptions = [
  "Ver productos",
  "Ver carrito",
  "Confirmar pedido",
  "Borrar Pedido",
  "Salir",
];

export const getInstruction = {
  getInstruction: {
    message: async () => {
      return `You can choose an option or ask me a question:`;
    },
    options: menuOptions,
    path: async (params: Params) => {
      const instruction = await ChatbotService.GetIntructions(
        params.userInput.trim()
      );
      console.log(instruction);

      switch (instruction) {
        case "show_products":
          return "show_products";
        case "show_cart":
          return "show_cart";
        case "confirm_purchase":
          return "confirm_purchase";
        case "unknown_command":
          return "unknown_command";
        case "delete_cart":
          return "delete_cart";
        case "exit":
          return "end";
        default:
          return "unknown_command";
      }
    },
  },
};
