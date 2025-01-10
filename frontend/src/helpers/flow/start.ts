import { Params } from "react-chatbotify";
import { ChatbotService } from "../../service/ChatbotService.service";

export const start = {
  start: {
    message: async (params: Params) => {
      try {
        const response = await ChatbotService.GetResponse("cliente dijo hola");
        await params.injectMessage(response);
        await params.goToPath("getInstruction");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
