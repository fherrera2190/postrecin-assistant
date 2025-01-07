import { GetInstructionResponse, GetQuestionResponse } from "../interfaces";
import { HttpService } from "./HttpService.service";

export class ChatbotService {
  private httpService = new HttpService("/susho-asistente");

  constructor() {}

  public async GetIntructions(text: string): Promise<string> {
    const { data } = await this.httpService.post<
      GetInstructionResponse,
      {
        question: string;
      }
    >("/get-instruction", {
      question: text,
    });
    return data.data.instruction;
  }

  public async GetResponse(text: string): Promise<string> {
    const { data } = await this.httpService.post<
      GetQuestionResponse,
      {
        question: string;
      }
    >("/user-question", {
      question: text,
    });
    return data.data.response;
  }
}
