import { EnvConfiguration } from 'src/config/app.config';

export const getChatCompletionResponseWhithTools = async (
  openai,
  messages,
  tools,
) => {
  const response = await openai.chat.completions.create({
    model: EnvConfiguration().model,
    messages,
    tools,
    stream: false,
    parallel_tool_calls: false,
    tool_choice: 'auto',
    temperature: 0,
  });
  return response;
};
