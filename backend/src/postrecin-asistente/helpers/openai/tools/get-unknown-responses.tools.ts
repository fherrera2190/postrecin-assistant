export const toolsUnknownResponses: any = [
  {
    type: 'function',
    function: {
      description:
        'Only use when customer wants to see characteristics of a product. It takes no parameters.',
      name: 'all_products',
      parameters: {
        type: 'object',
        properties: {},
      },
    },
  },
];

const all_products = async () => {
  const response = await fetch('http://localhost:3000/products');
  const products = await response.json();
  return `Estos son los productos: ${JSON.stringify(products)}`;
};

export const functions = {
  all_products,
};
