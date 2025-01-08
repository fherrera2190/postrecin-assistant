import OpenAI from 'openai';
import { getUnknownResponse } from '../helpers/openai/prompts/getUnknownResponse';
import { getChatCompletionResponseWithoutTools } from '../helpers/openai/responses/getChatCompletionResponseWithoutTools ';
interface Options {
  question: string;
}

export const getResponseUseCase = async (openai: OpenAI, options: Options) => {
  const { question } = options;
  const messages: any = [{ role: 'system', content: getUnknownResponse }];
  messages.push({ role: 'user', content: question });

  const response = await getChatCompletionResponseWithoutTools(
    openai,
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
};
