import { Params } from "react-chatbotify";
import { ChatbotService } from "../../service/ChatbotService.service";
const chatbotservice = new ChatbotService();

export const start = {
  start: {
    message: async (params: Params) => {
      try {
        const response = await chatbotservice.GetResponse("cliente dijo hola");
        await params.injectMessage(response);
        await params.goToPath("getInstruction");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
