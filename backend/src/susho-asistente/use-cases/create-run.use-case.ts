import OpenAI from 'openai';

interface Options {
  threadId: string;
  assistantId?: string;
}

export const createRunUseCase = async (openai: OpenAI, options: Options) => {
  //asst_DyNyt95J5zdaeKRpZ6DbHPVd
  const { threadId, assistantId = 'asst_DyNyt95J5zdaeKRpZ6DbHPVd' } = options;

  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
    //instructions //Sobreescribe el asistente
  });
  return run;
};
