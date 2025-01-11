import { Params } from "react-chatbotify";
import { ChatbotService } from "../../service/ChatbotService.service";
import { AxiosError } from "axios";

export const unknownCommand = {
  unknown_command: {
    message: async (params: Params) => {
      try {
        const response = await ChatbotService.GetUnknownResponse(
          params.userInput.trim()
        );
        console.log(response);
        await params.injectMessage(response);
        await params.goToPath("getInstruction");
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.response?.data);
        }
        await params.injectMessage("I something went wrong.");
        return "getInstruction";
      }
    },
  },
};
