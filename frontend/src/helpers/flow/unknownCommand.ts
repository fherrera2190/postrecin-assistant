import { Params } from "react-chatbotify";
import { ChatbotService } from "../../service/ChatbotService.service";

export const unknownCommand = {
  unknown_command: {
    message: async (params: Params) => {
      try {
        const response = await ChatbotService.GetUnknownResponse(
          params.userInput.trim()
        );
        console.log(response);
        //Tengo Revisar problema aca espera un msj????
        await params.injectMessage(response);
        await params.goToPath("getInstruction");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
