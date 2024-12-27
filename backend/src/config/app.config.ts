export const EnvConfiguration = () => {
  const { MONGO_URL: mongodb, OPENAI_API_KEY: openai } = process.env;

  return {
    mongodb,
    openai,
  };
};
