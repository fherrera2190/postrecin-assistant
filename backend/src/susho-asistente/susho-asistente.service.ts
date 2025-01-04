import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { QuestionDto } from './dtos/question.dto';
import { getInstructionUseCase } from './use-cases/get-instruction.use-case';

@Injectable()
export class SushoAsistenteService {
  private openai = new OpenAI({
    baseURL: 'http://localhost:11434/v1',
    // apiKey:"",
  });

  async createThread() {}

  async userQuestion(questionDto: QuestionDto) {
    void questionDto;
  }
  async getInstruction(questionDto: QuestionDto) {
    const { question } = questionDto;

    try {
      const response = await getInstructionUseCase(this.openai, { question });

      return response;
    } catch (error) {
      console.log(error);
      return { error };
    }
  }
}
