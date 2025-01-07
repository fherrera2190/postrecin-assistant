import ChatBot from "react-chatbotify";
import { settings } from "../helpers/settings";
import appApi from "../api/appApi";
import { Product } from "../interfaces";
import { useCartStore } from "../stores/cart.store";

const menuOptions = [
  "Ver productos",
  "Ver carrito",
  "Confirmar pedido",
  "Salir",
];

const method = "POST";

const headers = {
  "Content-Type": "application/json",
};

export const MyChatBot = () => {
  const state = useCartStore((state) => state);

  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const flow = {
    start: {
      message: async (params: any) => {
        try {
          const { data } = await appApi.post(
            "/susho-asistente/user-question",
            {
              question: "cliente dijo hola",
            },
            {
              headers,
            }
          );

          await params.injectMessage(data.data.response);

          await params.goToPath("getInstruction");
        } catch (error) {
          console.log(error);
        }
      },
    },

    getInstruction: {
      message: `Puedes elegir una opción o realizarme una consulta:`,
      options: menuOptions,
      path: async (params: any) => {
        const response = await fetch(
          "http://localhost:3000/susho-asistente/get-instruction",
          {
            method,
            headers,
            body: JSON.stringify({ question: params.userInput.trim() }),
          }
        );

        const { data } = await response.json();
        const { instruction } = data;

        console.log(instruction);

        switch (instruction) {
          case "show_products":
            return "show_products";
          case "show_cart":
            return "show_cart";
          case "confirm_purchase":
            return "confirm_purchase";
          case "unknown_command":
            return "unknown_command";
          case "delete_cart":
            return "delete_cart";
          case "exit":
            return "end";
          default:
            await params.injectMessage(instruction);
            return "getInstruction";
        }
      },
    },

    show_cart: {
      message: async (params) => {
        const cart = state.cart;

        if (state.totalQuantity() < 1) {
          await params.injectMessage("No tienes productos en tu carrito");
          return await params.goToPath("getInstruction");
        }

        await params.injectMessage(`Productos en tu carrito:`);

        for (const productInCart of Object.values(cart)) {
          await params.injectMessage(
            `${productInCart.quantity} x ${productInCart.name}`
          );
          await delay(1000);
        }

        await params.injectMessage(`Tu total es: $${state.total()}`);
        return "";
      },
      options: ["Agregar mas productos", "Confirmar pedido", "Volver al menu"],
      chatDisabled: true,

      path: (params: any) => {
        switch (params.userInput) {
          case "Agregar mas productos":
            return "show_products";
          case "Confirmar pedido":
            return "confirm_purchase";
          case "Volver al menu":
            return "getInstruction";
        }
      },
    },

    unknown_command: {
      message: async (params: any) => {
        try {
          const response = await fetch(
            "http://localhost:3000/susho-asistente/user-question",
            {
              method,
              headers,
              body: JSON.stringify({ question: params.userInput.trim() }),
            }
          );

          const { data } = await response.json();
          return data.response;
        } catch (error) {
          console.log(error);
        }
      },
      transition: 1000,
      path: "getInstruction",
    },

    end: {
      message: async (params: any) => {
        try {
          const { data } = await appApi.post(
            "/susho-asistente/user-question",
            { question: "saludo de despedida al cliente" },
            { headers }
          );

          await params.injectMessage(data.data.response);
        } catch (error) {
          console.log(error);
        }
      },

      options: ["Start new conversation!"],
      chatDisabled: true,
      path: "start",
    },

    delete_cart: {
      message: async (params) => {
        if (state.totalQuantity() < 1) {
          await params.injectMessage("No tienes productos en tu carrito");
          await params.goToPath("getInstruction");
          return;
        }

        return "Estas seguro de querer vaciar tu carrito/pedido?";
      },

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

        switch (instruction) {
          case "yes":
            state.clearCart();
            await params.injectMessage("Se ha eliminado tu pedido 😢");
            await delay(1000);
            return "getInstruction";
          case "no":
            return "getInstruction";
          default:
            await params.injectMessage("No entendi tu respuesta");
            return;
        }
      },
    },

    show_products: {
      message: "Estos son nuestro productos:",
      checkboxes: async () => {
        const response = await fetch("http://localhost:3000/products");
        let products = await response.json();
        products = products.map((product: Product) => product.name);
        return { items: products, sendOutput: false };
      },

      function: async (params: any) => {
        let selectedProducts: string[] = params.userInput.split(",");

        selectedProducts = selectedProducts.map((product: string) => {
          return product.trim();
        });

        const response = await fetch("http://localhost:3000/products");
        let products = await response.json();

        products = products.filter((product: Product) =>
          selectedProducts.includes(product.name)
        );

        for (const product of products) {
          state.manageProductInCart({ ...product, quantity: 1 });
          await params.injectMessage(
            `Hemos agregado 1 ${product.name} a tu pedido 😊`
          );
          await delay(1000);
        }
        console.log(products);
      },

      chatDisabled: true,
      path: "getInstruction",
    },
  };

  return (
    <div className="chatbot">
      <ChatBot settings={settings} flow={flow} />
    </div>
  );
};
