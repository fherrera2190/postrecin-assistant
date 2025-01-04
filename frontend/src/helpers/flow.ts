/* eslint-disable @typescript-eslint/no-explicit-any */

export const flow = {
  start: {
    message: "Hi there! How can I help you?",

    path: async (params: any) => {
      const response = await fetch(
        "http://localhost:3000/susho-asistente/user-question",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: params.userInput, threadId: "" }),
        }
      );

      const data = await response.json();

      console.log(data.instruction);

      return data.instruction;
    },
  },

  show_products: {
    message: "Select a product:",
    checkboxes: async () => {
      const response = await fetch("http://localhost:3000/products");
      let products = await response.json();
      products = products.map((product: any) => product.nombre);

      return products;
    },
    chatDisabled: true,
    function: async (params) => {
      let selectedProducts = params.userInput.split(",");

      console.log(selectedProducts);

      selectedProducts = selectedProducts.map((product: any) => {
        return product.trim();
      });

      console.log(selectedProducts);
    },
    path: async (params) => {
      if (params.userInput.trim().toLowerCase() === "cancel") return "start";
    },
  },
  end: {
    message: "Thank you for your interest, we will get back to you shortly!",

    options: ["Start new conversation!"],
    path: "start",
  },
};
