import OpenAI from 'openai';

export const getProducts = async () => {
  const res = await fetch('http://localhost:3000/products');
  const products = await res.json();
  return products;
};

interface Params {
  threadId: string;
  runId: string;
  toolOutputs: any[];
  openai: OpenAI;
}

export const submitToolOutputs = async ({
  openai,
  toolOutputs,
  runId,
  threadId,
}: Params) => {
  try {
    openai.beta.threads.runs.submitToolOutputsAndPoll(threadId, runId, {
      tool_outputs: toolOutputs,
    });
  } catch (error) {
    console.error('Error submitting tool outputs:', error);
  }
};
