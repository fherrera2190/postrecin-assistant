import { Params } from "react-chatbotify";
import { ChatbotService } from "../../service/ChatbotService.service";

export const end = {
  end: {
    message: async (params: Params) => {
      try {
        const response = await ChatbotService.GetResponse(
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
