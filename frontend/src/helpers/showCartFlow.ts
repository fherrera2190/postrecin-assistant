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
    path: "other",
  },


  show_cart: {},

  other: {
    // message: "Otra cosa",
    checkboxes: {
      items: ["Dog", "Cat", "Rabbit"],
      // min: 2,
      // sendOutput: true,
      // reusable: false,
    },
    path: "end",
  },

  end: {
    message: async (params) => {
      console.log(params);
      console.log(params.currPath);
      await params.removeMessage();
    },

    options: ["Start new conversation!"],
    path: "start",
  },
};
