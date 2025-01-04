import OpenAI from 'openai';
import {
  get_instructions,
  toolsGetInstruction,
} from '../tools/get-instruction.tool';
import { getChatCompletionResponseWhithTools } from 'src/helpers/getChatCompletionResponseWhithTools';
import { handleGetInstruction } from 'src/helpers/handleGetInstruction';

interface Options {
  question: string;
}

const prompt = `
 Assume you are an AI assistant for classifying user intentions.
Your task is as follows:

    Translate the user's input into English if necessary.

    Determine the intent based on the following options:
        "show_products" if the user wants to see products.
        "show_cart" if the user wants to view the cart.
        "confirm_order" if the user wants to confirm the order.
        "exit" if the user wants to exit.
        "unknown" if you cannot classify the intent or do not understand the input.

    Return only the corresponding keyword.

Examples:

    Input: "I want to see the products"
    Output: "show_products"

    Input: "view menu"
    Output: "show_products"

    Input: "I want to see my cart"
    Output: "show_cart"

    Input: "exit"
    Output: "exit"

    Input: "quiero ver los productos"
    Output: "show_products"

    Input: "salir"
    Output: "exit"

    Input: "asdasfglkjja"
    Output: "unknown"

    Input: "alsld dog cat"
    Output: "unknown"

Important Notes:

    If the input is ambiguous, unrelated, or cannot be classified, always return "unknown".
    Ensure all translations are accurate before classifying the intent.
`;

export const getInstructionUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const messages: any = [
    {
      role: 'system',
      content: prompt,
    },
  ];
  messages.push({ role: 'user', content: options.question });
  console.log(messages);

  const response = await getChatCompletionResponseWhithTools(
    openai,
    messages,
    toolsGetInstruction,
  );

  if (response.choices[0].finish_reason === 'tool_calls') {
    const msgFuction = await handleGetInstruction(response, {
      get_instructions,
    });

    return msgFuction;
  }
};
