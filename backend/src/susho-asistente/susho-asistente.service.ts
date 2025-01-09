import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { QuestionDto } from './dtos/question.dto';
import { getInstructionUseCase } from './use-cases/get-instruction.use-case';
import { getResponseUseCase } from './use-cases/get-response.use-case';
import { getUnknownResponseUseCase } from './use-cases/get-unknown-response.use-case';
import { EnvConfiguration } from 'src/config/app.config';

@Injectable()
export class SushoAsistenteService {
  private openai = new OpenAI({
    baseURL: EnvConfiguration().baseUrl,
    apiKey: EnvConfiguration().apiKey,
  });

  async getResponse(questionDto: QuestionDto) {
    const { question } = questionDto;

    try {
      const response = await getResponseUseCase(this.openai, { question });
      return response;
    } catch (error) {
      console.log(error);
      return { ok: false, error: error.message };
    }
  }

  async getInstruction(questionDto: QuestionDto) {
    const { question } = questionDto;

    try {
      const response = await getInstructionUseCase(this.openai, { question });

      return response;
    } catch (error) {
      console.log(error);
      return { ok: false, error: error.message };
    }
  }

  async getUnknownResponse(questionDto: QuestionDto) {
    const { question } = questionDto;
    try {
      const response = await getUnknownResponseUseCase(this.openai, {
        question,
      });

      return response;
    } catch (error) {
      console.log(error);
      return { ok: false, error: error.message };
    }
  }
}
