export const toolsGetInstruction: any = [
  {
    type: 'function',
    function: {
      name: 'get_instructions',
      description: 'Return only instruction',
      parameters: {
        type: 'object',
        properties: {
          question: {
            type: 'string',
            enum: [
              'show_products',
              'show_cart',
              'confirm_order',
              'unknown',
              'exit',
            ],
            description: `Action that the user wants to perform. Can be one of:
          
              - show_products: Used to show the products available for purchase.
              - show_cart: Used to show the cart of the customer.
              - unknown: When the AI cannot classify the intent.
              - confirm_order: Used to confirm the order of the customer.
              - exit: Used to exit the conversation.`,
          },
        },
        required: ['question'],
      },
    },
  },
];

export const get_instructions = ({ question }) => {
  console.log(question);
  switch (question) {
    case 'show_products':
      return 'show_products';
    case 'show_cart':
      return 'show_cart';
    case 'confirm_order':
      return 'confirm_order';
    case 'exit':
      return 'exit';
    default:
      return 'unknown';
  }
};
