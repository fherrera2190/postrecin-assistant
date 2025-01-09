import {
  DataText,
  GetInstructionResponse,
  GetQuestionResponse,
} from "../interfaces";
import { HttpService } from "./HttpService.service";

export class ChatbotService {
  private httpService = new HttpService("/susho-asistente");

  public async GetIntructions(text: string): Promise<string> {
    const { data } = await this.httpService.post<
      GetInstructionResponse,
      DataText
    >("/get-instruction", {
      question: text,
    });
    return data.data.instruction;
  }

  public async GetResponse(text: string): Promise<string> {
    const { data } = await this.httpService.post<GetQuestionResponse, DataText>(
      "/user-question",
      {
        question: text,
      }
    );
    return data.data.response;
  }

  public async GetUnknownResponse(text: string): Promise<string> {
    const { data } = await this.httpService.post<GetQuestionResponse, DataText>(
      "/get-unknown-response",
      {
        question: text,
      }
    );
    return data.data.response;
  }
}
