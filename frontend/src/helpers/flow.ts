/* eslint-disable @typescript-eslint/no-explicit-any */

import appApi from "../api/appAPi";

export const flow = {
  start: {
    message: async (params: any) => {
      const { data } = await appApi.post(
        "/susho-asistente/user-question",
        {
          question: "cliente dijo hola",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data.data.response;
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
