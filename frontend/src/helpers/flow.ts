import type { Flow, Params } from "react-chatbotify";
import { Product } from "../interfaces";
import { useCartStore } from "../stores/cart.store";
import { ChatbotService } from "../service/ChatbotService.service";
import { ProductsService } from "../service/ProductsService.service";

const chatbotservice = new ChatbotService();
const productsService = new ProductsService();

const menuOptions = [
  "Ver productos",
  "Ver carrito",
  "Confirmar pedido",
  "Borrar Pedido",
  "Salir",
];

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const flow: Flow = {
  start: {
    message: async (params: Params) => {
      try {
        const response = await chatbotservice.GetResponse("cliente dijo hola");
        await params.injectMessage(response);
        await params.goToPath("getInstruction");
      } catch (error) {
        console.log(error);
      }
    },
  },

  getInstruction: {
    message: `Puedes elegir una opción o realizarme una consulta:`,
    options: menuOptions,
    path: async (params: Params) => {
      const instruction = await chatbotservice.GetIntructions(
        params.userInput.trim()
      );
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
    message: async (params: Params) => {
      if (useCartStore.getState().totalQuantity() === 0) {
        await params.injectMessage("No tienes productos en tu carrito");
      } else {
        await params.injectMessage(`Productos en tu carrito:`);

        for (const productInCart of Object.values(
          useCartStore.getState().cart
        )) {
          await params.injectMessage(
            `${productInCart.quantity} x ${productInCart.name}`
          );
          await delay(1000);
        }

        await params.injectMessage(
          `Tu total es: $${useCartStore.getState().total()}`
        );
        // return "";
      }
    },
    options: ["Agregar mas productos", "Confirmar pedido", "Volver al menu"],

    chatDisabled: true,

    path: (params: Params) => {
      switch (params.userInput) {
        case "Agregar mas productos":
          return "show_products";
        case "Confirmar pedido":
          return "confirm_purchase";
        default:
          return "getInstruction";
      }
    },
  },

  unknown_command: {
    message: async (params: Params) => {
      try {
        const response = await chatbotservice.GetResponse(
          params.userInput.trim()
        );
        //Tengo Revisar problema aca espera un msj????
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    path: "getInstruction",
  },

  end: {
    message: async (params: Params) => {
      try {
        const response = await chatbotservice.GetResponse(
          "saludo de despedida al cliente"
        );

        await params.injectMessage(response);
      } catch (error) {
        console.log(error);
      }
    },

    options: ["Start new conversation!"],
    chatDisabled: true,
    path: "start",
  },

  delete_cart: {
    message: async (params: Params) => {
      if (useCartStore.getState().totalQuantity() < 1) {
        await params.injectMessage("No tienes productos en tu carrito");
        await params.goToPath("getInstruction");
        return;
      }

      return "Estas seguro de querer vaciar tu carrito/pedido?";
    },

    path: async (params: Params) => {
      const instruction = await chatbotservice.GetIntructions(
        params.userInput.trim()
      );

      switch (instruction) {
        case "yes":
          useCartStore.getState().clearCart();
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
    message: "Estos son nuestro productos quieres elegir alguno?",
    checkboxes: async () => {
      const response = await productsService.getProducts();
      const products: string[] = response.map((product) => product.name);
      return { items: products, sendOutput: false };
    },

    options: ["No"],

    function: async (params: Params) => {
      let selectedProducts: string[] = params.userInput.split(",");

      selectedProducts = selectedProducts.map((product: string) => {
        return product.trim();
      });

      let products = await productsService.getProducts();

      products = products.filter((product: Product) =>
        selectedProducts.includes(product.name)
      );

      for (const product of products) {
        useCartStore
          .getState()
          .manageProductInCartChatbot({ ...product, quantity: 1 });
        await params.injectMessage(
          `Hemos agregado 1 ${product.name} a tu pedido 😊`
        );
        await delay(1000);
      }
    },

    chatDisabled: true,
    path: "getInstruction",
  },
};
