export const tools: any = [
  {
    type: 'function',
    function: {
      name: 'get_instructions',
      description: 'Returns the instructions for the user.',
      parameters: {
        type: 'object',
        properties: {
          question: {
            type: 'string',
            enum: [
              'Show Products',
              'Show Cart',
              'Ask me something',
              'Confirm Order',
              'exit',
            ],
            description: `Action that the user wants to perform. Can be one of:
        
            - show_products: Used to show the products available for purchase.
            - show_cart: Used to show the cart of the customer.
            - ask_me_something: Used to ask the customer any other question.
            - confirm_order: Used to confirm the order of the customer.
            - exit: Used to exit the conversation.`,
          },
        },
        required: ['question'],
      },
    },
  },
];

export const getResponse = (question) => {
  console.log(question);
  return `${question}`;
};

function get_instructions() {}
export const options = {
  get_instructions,
};
