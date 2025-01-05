import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { QuestionDto } from './dtos/question.dto';
import { getInstructionUseCase } from './use-cases/get-instruction.use-case';
import { getChatCompletionResponseWithoutTools } from 'src/helpers/openai/responses/getChatCompletionResponseWithoutTools ';
import { getUnknownResponse } from 'src/helpers/openai/prompts/getUnknownResponse';

@Injectable()
export class SushoAsistenteService {
  private openai = new OpenAI({
    baseURL: 'http://localhost:11434/v1',
    apiKey: '',
  });

  async createThread() {}
  //unknown_command
  async userQuestion(questionDto: QuestionDto) {
    void questionDto;
  }

  async getResponse(questionDto: QuestionDto) {
    const { question } = questionDto;
    console.log(question);

    const messages: any = [{ role: 'system', content: getUnknownResponse }];
    messages.push({ role: 'user', content: question });

    try {
      const response = await getChatCompletionResponseWithoutTools(
        this.openai,
        messages,
        1,
      );

      const result = {
        ok: true,
        data: {
          response: response.choices[0].message.content,
        },
      };
      return result;
    } catch (error) {
      console.log(error);
      return { ok: false, error: error.message };
    }
  }

  async getInstruction(questionDto: QuestionDto) {
    const { question } = questionDto;

    try {
      const response = await getInstructionUseCase(this.openai, { question });

      const result = {
        ok: true,
        data: {
          instruction: response.choices[0].message.content,
        },
      };
      return result;
    } catch (error) {
      console.log(error);
      return { ok: false, error: error.message };
    }
  }
}
