import { Params } from "react-chatbotify";
import { delay } from "../delay";
import { ChatbotService } from "../../service/ChatbotService.service";
const chatbotservice = new ChatbotService();

export const unknownCommand = {
  unknown_command: {
    message: async (params: Params) => {
      try {
        const response = await chatbotservice.GetUnknownResponse(
          params.userInput.trim()
        );
        console.log(response);
        //Tengo Revisar problema aca espera un msj????
        delay(1000);
        await params.injectMessage(response);
        await params.goToPath("getInstruction");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
