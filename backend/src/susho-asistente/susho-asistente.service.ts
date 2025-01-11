import { Injectable, Logger } from '@nestjs/common';
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

  private readonly logger = new Logger(SushoAsistenteService.name);

  async getResponse(questionDto: QuestionDto) {
    const { question } = questionDto;

    try {
      const response = await getResponseUseCase(this.openai, { question });
      return response;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async getInstruction(questionDto: QuestionDto) {
    const { question } = questionDto;

    try {
      const response = await getInstructionUseCase(this.openai, { question });

      return response;
    } catch (error) {
      this.handleExceptions(error);
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
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any) {
    this.logger.error(error);
    return error;
  }
}
