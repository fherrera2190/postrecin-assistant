import { Params } from "react-chatbotify";
import { ChatbotService } from "../../service/ChatbotService.service";
import { AxiosError } from "axios";

export const start = {
  start: {
    message: async (params: Params) => {
      try {
        const response = await ChatbotService.GetResponse(
          "Welcome the customer with a polite message"
        );
        await params.injectMessage(response);
        await params.goToPath("getInstruction");
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.response?.data);
        }
        await params.injectMessage("Something went wrong.");
      }
    },
  },
};
