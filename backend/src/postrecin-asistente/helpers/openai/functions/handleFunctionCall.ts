export const handleFunctionCall = async (response: any, options: any) => {
  for (const toolCall of response.choices[0].message.tool_calls) {
    const args = JSON.parse(toolCall.function.arguments);
    console.log(args);

    const functionName = toolCall.function.name;
    if (Object.keys(options).includes(functionName)) {
      const result = await options[functionName](args);
      console.log(result);
      return {
        role: 'tool',
        tool_call_id: toolCall.id,
        content: JSON.stringify(result),
        name: functionName,
      };
    }
  }
};
