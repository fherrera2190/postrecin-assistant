export const handleGetUnknowResponseFunctionCall = async (
  response: any,
  functions: any,
) => {
  console.log('Entree acaaaaaaaaaaaa');
  for (const toolCall of response.choices[0].message.tool_calls) {
    const args = JSON.parse(toolCall.function.arguments);
    const functionName = toolCall.function.name;
    console.log(functionName);
    if (Object.keys(functions).includes(functionName)) {
      const result = await functions[functionName](args);
      return {
        role: 'tool',
        tool_call_id: toolCall.id,
        content: result,
        name: functionName,
      };
    } else {
      return {
        role: 'tool',
        tool_call_id: toolCall.id,
        content: '',
        name: functionName,
      };
    }
  }
};

// export const handleGetUnknowResponseFunctionCall = async (
//   response: any,
//   functions: any,
// ) => {
//   console.log('Entree acaaaaaaaaaaaa');
//   for (const toolCall of response.choices[0].message.tool_calls) {
//     const args = JSON.parse(toolCall.function.arguments);
//     const functionName = toolCall.function.name;
//     console.log(functionName);
//     if (Object.keys(functions).includes(functionName)) {
//       const result = await functions[functionName](args);
//       return {
//         role: 'tool',
//         tool_call_id: toolCall.id,
//         content: JSON.stringify(result),
//         name: functionName,
//       };
//     }
//   }
// };
