import { Params } from "react-chatbotify";
import { ChatbotService } from "../../service/ChatbotService.service";
import { AxiosError } from "axios";

export const end = {
  end: {
    message: async (params: Params) => {
      try {
        const response = await ChatbotService.GetResponse(
          "Say goodbye to the customer with a polite and friendly message"
        );

        await params.injectMessage(response);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.response?.data);
        }
        await params.injectMessage("I something went wrong.");
        return "getInstruction";
      }
    },

    options: ["Start new conversation!"],
    chatDisabled: true,
    path: "start",
  },
};
