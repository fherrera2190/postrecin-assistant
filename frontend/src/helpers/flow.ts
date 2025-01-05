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

      await params.injectMessage(data.response);
    },
    path: "show_art",
  },

  show_art: {
    // message: "No tienes productos en tu carrito",
    message: async (params) => {
      const cart: any = ["a"];

      if (cart.length < 1) {
        await params.injectMessage("No tienes productos en tu carrito");
        return await params.goToPath("end");
      }

      await params.injectMessage(`'Productos en tu carrito:'
        1 x maki
        1 x sashimi
        1 x nigiri    
        `);
      await params.injectMessage(`Total: $10.00`);
      await params.injectMessage(`Que deseas hacer?`);
      return "";
    },

    options: ["Agregar mas productos", "Confirmar pedido", "Volver al menu"],
    chatDisabled: true,

    path: (params) => {
      if (params.userInput === "Agregar mas productos") {
        return "show_art";
      }
      if (params.userInput === "Confirmar pedido") {
        return "confirm_purchase";
      }
      if (params.userInput === "Volver al menu") {
        return "end";
      }
    },
  },

  end: {
    message: async (params) => {
      return "";
    },

    options: ["Start new conversation!"],
    path: "start",
  },
};
