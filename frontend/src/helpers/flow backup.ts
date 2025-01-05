/* eslint-disable @typescript-eslint/no-explicit-any */

export const flow = {
  start: {
    message: async (params: any) => {
      const response = await fetch(
        "http://localhost:3000/susho-asistente/user-question",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: "cliente dijo hola" }),
        }
      );

      const { data } = await response.json();

      params.injectMessage(data.response);

      params.goToPath("getInstruction");
    },
  },

  getInstruction: {
    message: `
    opciones:
    1. Mostrar productos
    2. Mostrar carrito
    4. Confirmar pedido
    5. Salir
    `,

    path: async (params: any) => {
      const response = await fetch(
        "http://localhost:3000/susho-asistente/get-instruction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: params.userInput.trim() }),
        }
      );

      const { data } = await response.json();
      const { instruction } = data;

      console.log(instruction);
      if (instruction === "exit") return "end";
      if (params.userInput === "cancelar") return "getInstruction";
      return instruction;
    },
  },

  show_products: {
    message: "Select a product:",
    checkboxes: async () => {
      const response = await fetch("http://localhost:3000/products");
      let products = await response.json();
      products = products.map((product: any) => product.nombre);

      return { items: products, sendOutput: true, reusable: true };
    },
    function: async (params: any) => {
      let selectedProducts = params.userInput.split(",");

      console.log(selectedProducts);

      selectedProducts = selectedProducts.map((product: any) => {
        return product.trim();
      });

      console.log(selectedProducts);
    },
    path: async (params: any) => {
      return "getInstruction";
    },
  },

  show_cart: {
    message: async (params) => {
      params.injectMessage(`
      Tus pedidos son:
      1 x maki
      1 x roll
      1 x nigiri
     `);
      params.injectMessage(`Te puedo ayudar en algo más?`);
      params.goToPath("getInstruction");
    },
  },

  unknown_command: {
    message: async (params: any) => {
      const response = await fetch(
        "http://localhost:3000/susho-asistente/user-question",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: params.userInput.trim() }),
        }
      );

      const { data } = await response.json();
      console.log(data);
      return data.response;
    },
    path: "getInstruction",
  },
  end: {
    message: async (params: any) => {
      const response = await fetch(
        "http://localhost:3000/susho-asistente/user-question",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: params.userInput.trim() }),
        }
      );

      const { data } = await response.json();

      return data.response;
    },

    options: ["Start new conversation!"],
    path: "start",
  },
};
