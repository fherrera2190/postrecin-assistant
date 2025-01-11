import {
  DataText,
  GetInstructionResponse,
  GetQuestionResponse,
} from "../interfaces";
import { HttpService } from "./HttpService.service";

export class ChatbotService {
  static httpService = new HttpService("/postrecin-asistente");

  static  async GetIntructions(text: string): Promise<string> {
    const { data } = await this.httpService.post<
      GetInstructionResponse,
      DataText
    >("/get-instruction", {
      question: text,
    });
    return data.data.instruction;
  }

  static async GetResponse(text: string): Promise<string> {
    const { data } = await this.httpService.post<GetQuestionResponse, DataText>(
      "/user-question",
      {
        question: text,
      }
    );
    return data.data.response;
  }

  static async GetUnknownResponse(text: string): Promise<string> {
    const { data } = await this.httpService.post<GetQuestionResponse, DataText>(
      "/get-unknown-response",
      {
        question: text,
      }
    );
    return data.data.response;
  }
}
