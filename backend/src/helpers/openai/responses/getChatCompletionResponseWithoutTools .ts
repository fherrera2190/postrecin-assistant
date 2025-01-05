import OpenAI from 'openai';
import { EnvConfiguration } from 'src/config/app.config';

export const getChatCompletionResponseWithoutTools = async (
  openai: OpenAI,
  messages: any,
  temperature: number = 0,
) => {
  const response = await openai.chat.completions.create({
    model: EnvConfiguration().model,
    messages,
    stream: false,
    tool_choice: 'auto',
    temperature,
  });
  return response;
};
