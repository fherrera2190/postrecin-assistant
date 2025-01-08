import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { QuestionDto } from './dtos/question.dto';
import { getInstructionUseCase } from './use-cases/get-instruction.use-case';
import { getResponseUseCase } from './use-cases/get-response.use-case';
import { getUnknownResponseUseCase } from './use-cases/get-unknown-response.use-case';

@Injectable()
export class SushoAsistenteService {
  private openai = new OpenAI({
    baseURL: 'http://localhost:11434/v1',
    apiKey: '',
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
