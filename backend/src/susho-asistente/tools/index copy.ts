export const tools: any = [
  {
    type: 'function',
    function: {
      name: 'getCurrentDateTime',
      description: 'Returns the current date and time.',
      parameters: {
        type: 'object',
        properties: {},
      },
    },
  },

  // {
  //   type: 'function',
  //   function: {
  //     description:
  //       'Only use when customer wants to see characteristics of a product. It takes a product name as parameter.',
  //     name: 'searchProducts',
  //     parameters: {
  //       type: 'object',
  //       properties: {
  //         query: {
  //           description: 'The name of the product to add to the cart.',
  //         },
  //       },
  //       required: ['query'],
  //     },
  //   },
  // },

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
  // {
  //   type: 'function',
  //   function: {
  //     name: 'showCart',
  //     description:
  //       'Only use when customer wants to see the products o mentions "ver carrito" "ver pedido" "show cart"  . It takes no parameters.',
  //     parameters: {
  //       type: 'object',
  //       properties: {},
  //     },
  //   },
  // },

  // {
  //   type: 'function',
  //   function: {
  //     description:
  //       'This function deletes the cart of customer. It takes no parameters.',
  //     name: 'deleteCart',
  //     parameters: {
  //       type: 'object',
  //       properties: {},
  //     },
  //   },
  // },
  // {
  //   type: 'function',
  //   function: {
  //     name: 'addProductTocart',
  //     description:
  //       'This function adds a product to the cart. It takes a product name and quantity as parameters. Returns success or failure.',
  //     parameters: {
  //       type: 'object',
  //       properties: {
  //         name: {
  //           type: 'string',
  //           description: 'The name of the product to add to the cart.',
  //         },
  //         quantity: {
  //           type: 'number',
  //           description: 'The quantity of the product to add to the cart.',
  //         },
  //       },
  //       required: ['name', 'quantity'],
  //     },
  //   },
  // },
  // {
  //   type: 'function',
  //   function: {
  //     name: 'checkOrder',
  //     description: 'This function checks the status of an order.',
  //     parameters: {
  //       type: 'object',
  //       properties: {
  //         orderId: {
  //           type: 'string',
  //           description: 'The ID of the order to check.',
  //         },
  //       },
  //       required: ['orderId'],
  //     },
  //   },
  // },
];

// let cart: any = [];
// const checkOrder = async ({ orderId }: { orderId: string }) => {
//   // const response = await fetch('http://localhost:3000/orders/' + orderId);
//   // const order = await response.json();
//   // return 'result: ' + JSON.stringify(order);

//   if (!orderId) {
//     return 'Please must provide an order id';
//   }

//   return `The order ${orderId} is prepared`;
// };

const allProducts = async () => {
  console.log('Estos son los productos');
  const response = await fetch('http://localhost:3000/products');
  const products = await response.json();

  return { products };
};

// const searchProducts = async ({ name }: { name: string }) => {
//   const response = await fetch('http://localhost:3000/products/' + name);
//   const products = await response.json();

//   return 'result: ' + JSON.stringify(products);
// };

// const addProductTocart = async ({
//   name,
//   quantity = 1,
// }: {
//   name: string;
//   quantity: number;
// }) => {
//   console.log(name, quantity);

//   const response = await fetch('http://localhost:3000/products/' + name);
//   const products = await response.json();

//   console.log(products.length);
//   if (products.length > 1) {
//     return (
//       'There are multiple products with that name: ' + JSON.stringify(products)
//     );
//   }
//   if (products.length === 0) {
//     return 'Product not found: ' + name;
//   }

//   if (cart.find((item: any) => item.name === name)) {
//     cart = cart.map((item: any) => {
//       if (item.name === name) {
//         item.quantity += +quantity;
//       }
//       return item;
//     });

//     return (
//       'Product added successfully: your new cart is ' + JSON.stringify(cart)
//     );
//   }

//   cart.push({ name, quantity: +quantity });

//   return 'Product added successfully: your new cart is ' + JSON.stringify(cart);
// };

// const showCart = async () => {
//   if (cart.length === 0) {
//     return 'Tienes 0 productos en el carrito';
//   }
//   return 'Tu pedido es ' + JSON.stringify(cart);
// };

// const deleteCart = async () => {
//   cart = [];

//   return 'Tienes 0 productos en el carrito';
// };

export const getResponse = (question) => {
  return ``;
};

function getCurrentDateTime() {
  const now = new Date(); // Obtiene la fecha y hora actuales
  const hours = now.getHours(); // Obtiene la hora
  const minutes = now.getMinutes(); // Obtiene los minutos
  const seconds = now.getSeconds(); // Obtiene los segundos

  // Asegura que los minutos y segundos tengan dos dígitos
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return formattedTime; // Devuelve la hora como cadena
}
export const options = {
  allProducts,
  // addProductTocart,
  // showCart,
  // deleteCart,
  // searchProducts,
  // checkOrder,
  getCurrentDateTime,
  getResponse,
};
