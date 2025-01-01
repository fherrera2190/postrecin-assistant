export const EnvConfiguration = () => {
  const {
    MONGO_URL: mongodb,
    OPENAI_API_KEY: openai,
    MODEL_LLM: model,
  } = process.env;

  return {
    mongodb,
    openai,
    model,
  };
};
