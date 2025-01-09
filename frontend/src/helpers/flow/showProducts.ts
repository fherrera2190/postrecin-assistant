import { Params } from "react-chatbotify";
import { Product } from "../../interfaces";
import { useCartStore } from "../../stores/cart.store";
import { delay } from "../delay";
import { ProductsService } from "../../service/ProductsService.service";
const productsService = new ProductsService();

export const showProducts = {
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
