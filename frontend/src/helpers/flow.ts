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
      console.log(data);
    },
  },

  end: {
    message: "Thank you for your interest, we will get back to you shortly!",

    options: ["Start new conversation!"],
    path: "start",
  },
};
