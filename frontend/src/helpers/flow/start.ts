import { Params } from "react-chatbotify";
import { ChatbotService } from "../../service/ChatbotService.service";

export const start = {
  start: {
    message: async (params: Params) => {
      try {
        const response = await ChatbotService.GetResponse("Welcome the customer with a polite message");
        await params.injectMessage(response);
        await params.goToPath("getInstruction");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
