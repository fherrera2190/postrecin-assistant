import OpenAI from 'openai';
import { promptGetInstruction } from '../helpers/openai/prompts/getInstruction.prompt';
import { getChatCompletionResponseWithoutTools } from '../helpers/openai/responses/getChatCompletionResponseWithoutTools ';
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
  const result = {
    ok: true,
    data: {
      instruction: response.choices[0].message.content,
    },
  };
  return result;
};
