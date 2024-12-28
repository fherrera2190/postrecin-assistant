import OpenAI from 'openai';
import { submitToolOutputs } from './functions-calling';

interface Options {
  threadId: string;
  runId: string;
}

export const checkCompleteStatusUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { threadId, runId } = options;

  const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
  console.log({ status: runStatus.status });
  if (runStatus.status === 'requires_action') {
    console.log('Entre aca>>>>>>>>>>>>>>>>>>>');

    const toolOutputs =
      runStatus.required_action.submit_tool_outputs.tool_calls.map(
        (toolCall) => {
          if (toolCall.function.name === 'getProducts') {
            return {
              tool_call_id: toolCall.id,
              output: JSON.stringify([
                {
                  nombre: 'Nigiri',
                  descripcion:
                    'Pequeña bola de arroz de sushi sobre la que se coloca una lámina de pescado o marisco, a menudo acompañada de wasabi.',
                  precio: 5.99,
                  procedencia: 'Japón',
                  ingredientes: ['arroz de sushi', 'pescado crudo', 'wasabi'],
                  popularidad: 9,
                  vegetariano: false,
                  stock: 50,
                  imagen: 'https://miweb.com/images/nigiri.jpg',
                  calorias: 200,
                  categoria: 'Nigiri',
                },
                {
                  nombre: 'Maki',
                  descripcion:
                    'Rollos de arroz y otros ingredientes envueltos en alga nori, cortados en piezas pequeñas.',
                  precio: 7.49,
                  procedencia: 'Japón',
                  ingredientes: [
                    'arroz de sushi',
                    'alga nori',
                    'pescado',
                    'vegetales',
                  ],
                  popularidad: 8,
                  vegetariano: false,
                  stock: 30,
                  imagen: 'https://miweb.com/images/maki.jpg',
                  calorias: 350,
                  categoria: 'Rollos',
                },
              ]),
            };
          }
        },
      );

    await submitToolOutputs({ openai, toolOutputs, runId, threadId });
  }

  if (runStatus.status === 'failed') {
    await openai.beta.threads.runs.cancel(threadId, runId);
    console.log('Se cancelo por que fallo');
    return null;
  }

  if (runStatus.status === 'completed') {
    return runStatus;
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return await checkCompleteStatusUseCase(openai, options);
};
