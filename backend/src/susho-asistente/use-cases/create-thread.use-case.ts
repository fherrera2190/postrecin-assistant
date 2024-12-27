import OpenAI from 'openai';

export const createThreadUseCase = async (openai: OpenAI) => {
  const { id } = await openai.beta.threads.create({
    tool_resources: {
      file_search: { vector_store_ids: [] },
    },
  });

  return { id };
};
