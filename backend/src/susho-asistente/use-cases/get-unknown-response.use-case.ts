import OpenAI from 'openai';
import {
  functions,
  toolsUnknownResponses,
} from '../helpers/openai/tools/get-unknown-responses.tools';
import { getChatCompletionResponseWhithTools } from '../helpers/openai/responses/getChatCompletionResponseWithTools ';
import { getUnknownResponse } from '../helpers/openai/prompts/getUnknownResponse';
import { handleGetUnknowResponseFunctionCall } from '../helpers/openai/functions/handleGetUnknowResponse.calling-functions';
import { getChatCompletionResponseWithoutTools } from '../helpers/openai/responses/getChatCompletionResponseWithoutTools ';
interface Options {
  question: string;
}

export const getUnknownResponseUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const messages: any = [
    {
      role: 'system',
      content: getUnknownResponse,
    },
  ];
  messages.push({ role: 'user', content: options.question });

  let response = await getChatCompletionResponseWhithTools(
    openai,
    messages,
    toolsUnknownResponses,
  );

  messages.push(response.choices[0].message);

  if (response.choices[0].finish_reason === 'tool_calls') {
    const msgFunction = await handleGetUnknowResponseFunctionCall(
      response,
      functions,
    );
    messages.push(msgFunction);
    console.log(messages);
    response = await getChatCompletionResponseWithoutTools(openai, messages, 0);
    const result = {
      ok: true,
      data: {
        response: response.choices[0].message.content,
      },
    };
    return result;
  }

  const result = {
    ok: true,
    data: {
      response: response.choices[0].message.content,
    },
  };
  return result;
};
