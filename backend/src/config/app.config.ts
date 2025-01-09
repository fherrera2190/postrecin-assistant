export const EnvConfiguration = () => {
  const { MONGO_URL: mongodb, MODEL_LLM: model } = process.env;

  const baseUrl = process.env.BASE_URL;

  const apiKey = baseUrl ? '' : process.env.OPENAI_API_KEY;

  // console.log(mongodb);
  // console.log(model);
  // console.log(baseUrl);
  // console.log(apiKey);

  return {
    mongodb,
    apiKey,
    model,
    baseUrl,
  };
};
