import { query } from 'express';

export const tools: any = [
  // {
  //   type: 'function',
  //   function: {
  //     name: 'speak_to_user',
  //     description:
  //       'Use this to speak to the user to give them information and to ask for anything required for their case.',
  //     parameters: {
  //       type: 'object',
  //       properties: {
  //         message: {
  //           type: 'string',
  //           description:
  //             'Text of message to send to user. Can cover multiple topics.',
  //         },
  //       },
  //       required: ['message'],
  //     },
  //   },
  // },

  // {
  //   type: 'function',
  //   function: {
  //     name: 'get_instructions',
  //     description:
  //       "Used to get instructions to deal with the user's requirement.",
  //     parameters: {
  //       type: 'object',
  //       properties: {
  //         option: {
  //           type: 'string',
  //           enum: ['menu', 'show cart', 'delete cart', 'add to cart'],
  //           description: `The option of customers. Can be one of:
  //         - menu: Used when the customer wants to see the menu.
  //         - show cart: Used when the customer wants to see the cart.
  //         - delete cart: Used when the customer wants to delete the cart.
  //         - add to cart: Used when the customer wants to add a product to the cart.
  //         `,
  //         },
  //       },
  //       required: ['option'],
  //     },
  //   },
  // },
  {
    type: 'function',
    function: {
      description:
        'Only use when customer wants to see characteristics of a product. It takes a product name as parameter.',
      name: 'searchProducts',
      parameters: {
        type: 'object',
        properties: {
          query: {
            enum: ['menu', 'show cart', 'delete cart', 'add to cart'],
            description: 'The name of the product to add to the cart.',
          },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      description:
        'Only use when customer wants to see all the products. It takes no parameters.',
      name: 'allProducts',
      parameters: {
        type: 'object',
        properties: {},
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'showCart',
      description:
        'Only use when customer wants to see the products o mentions "ver carrito" "ver pedido" "show cart"  . It takes no parameters.',
      parameters: {
        type: 'object',
        properties: {},
      },
    },
  },

  {
    type: 'function',
    function: {
      description:
        'This function deletes the cart of customer. It takes no parameters.',
      name: 'deleteCart',
      parameters: {
        type: 'object',
        properties: {},
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'addProductTocart',
      description:
        'This function adds a product to the cart. It takes a product name and quantity as parameters. Returns success or failure.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The name of the product to add to the cart.',
          },
          quantity: {
            type: 'number',
            description: 'The quantity of the product to add to the cart.',
          },
        },
        required: ['name', 'quantity'],
      },
    },
  },
];

let cart: any = [];

const allProducts = async () => {
  console.log('Estos son los productos');
  const response = await fetch('http://localhost:3000/products');
  const products = await response.json();

  return { products, msg: 'This is the list of options' };
};

const searchProducts = async ({ name }: { name: string }) => {
  const response = await fetch('http://localhost:3000/products/' + name);
  const products = await response.json();

  return 'result: ' + JSON.stringify(products);
};

const addProductTocart = async ({
  name,
  quantity = 1,
}: {
  name: string;
  quantity: number;
}) => {
  console.log(name, quantity);

  const response = await fetch('http://localhost:3000/products/' + name);
  const products = await response.json();

  console.log(products.length);
  if (products.length > 1) {
    return (
      'There are multiple products with that name: ' + JSON.stringify(products)
    );
  }
  if (products.length === 0) {
    return 'Product not found: ' + name;
  }

  if (cart.find((item: any) => item.name === name)) {
    cart = cart.map((item: any) => {
      if (item.name === name) {
        item.quantity += +quantity;
      }
      return item;
    });

    return (
      'Product added successfully: your new cart is ' + JSON.stringify(cart)
    );
  }

  cart.push({ name, quantity: +quantity });

  return 'Product added successfully: your new cart is ' + JSON.stringify(cart);
};

const showCart = async () => {
  if (cart.length === 0) {
    return 'Tienes 0 productos en el carrito';
  }
  return 'Tu pedido es ' + JSON.stringify(cart);
};

const deleteCart = async () => {
  cart = [];

  return 'Tienes 0 productos en el carrito';
};

export const options = {
  allProducts,
  addProductTocart,
  showCart,
  deleteCart,
  searchProducts,
};
