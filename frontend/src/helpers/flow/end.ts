import { Params } from "react-chatbotify";
import { ChatbotService } from "../../service/ChatbotService.service";

const chatbotservice = new ChatbotService();

export const end = {
  end: {
    message: async (params: Params) => {
      try {
        const response = await chatbotservice.GetResponse(
          "saludo de despedida al cliente"
        );

        await params.injectMessage(response);
      } catch (error) {
        console.log(error);
      }
    },

    options: ["Start new conversation!"],
    chatDisabled: true,
    path: "start",
  },
};
