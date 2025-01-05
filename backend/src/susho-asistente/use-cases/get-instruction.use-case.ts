import OpenAI from 'openai';
import { getChatCompletionResponseWithoutTools } from 'src/helpers/openai/responses/getChatCompletionResponseWithoutTools ';
import { promptGetInstruction } from 'src/helpers/openai/prompts/getInstruction.prompt';
interface Options {
  question: string;
}

export const getInstructionUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const messages: any = [
    {
      role: 'system',
      content: promptGetInstruction,
    },
  ];
  messages.push({ role: 'user', content: options.question });

  const response = await getChatCompletionResponseWithoutTools(
    openai,
    messages,
  );

  return response;
};
