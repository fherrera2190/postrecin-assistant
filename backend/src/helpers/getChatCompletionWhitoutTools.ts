import { EnvConfiguration } from 'src/config/app.config';

export const getChatCompletionWhitoutTools = async (openai, messages) => {
  const response = await openai.chat.completions.create({
    model: EnvConfiguration().model,
    messages,
    stream: false,
    parallel_tool_calls: false,
    tool_choice: 'auto',
    temperature: 0,
  });
  return response;
};
