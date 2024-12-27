import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { createThreadUseCase } from './use-cases/create-thread.use-case';
import { createMessageUseCase } from './use-cases/create-message.use-case';
import { QuestionDto } from './dtos/question.dto';
import { createRunUseCase } from './use-cases/create-run.use-case';
import { checkCompleteStatusUseCase } from './use-cases/check-complete-status.use-case';
import { getMessageUseCase } from './use-cases/get-message-list.use-case';

@Injectable()
export class SushoAsistenteService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async createThread() {
    return await createThreadUseCase(this.openai);
  }

  async userQuestion(questionDto: QuestionDto) {
    const { threadId, question } = questionDto;
    const message = await createMessageUseCase(this.openai, {
      threadId,
      question,
    });
    void message;
    const run = await createRunUseCase(this.openai, { threadId });
    await checkCompleteStatusUseCase(this.openai, { threadId, runId: run.id });
    const messages = await getMessageUseCase(this.openai, { threadId });
    return messages;
  }
}
