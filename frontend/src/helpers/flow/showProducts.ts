import { Params } from "react-chatbotify";
import { Product } from "../../interfaces";
import { useCartStore } from "../../stores/cart.store";
import { ProductsService } from "../../service/ProductsService.service";
import { AxiosError } from "axios";

export const showProducts = {
  show_products: {
    message: "Estos son nuestro productos quieres elegir alguno?",
    checkboxes: async (params: Params) => {
      try {
        const response = await ProductsService.getProducts();
        const products: string[] = response.map((product) => product.name);
        return { items: products, sendOutput: false };
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.response?.data);
        }
        await params.injectMessage("I something went wrong.");
        return { items: [], sendOutput: false };
      }
    },

    options: ["No"],

    function: async (params: Params) => {
      try {
        let selectedProducts: string[] = params.userInput.split(",");

        selectedProducts = selectedProducts.map((product: string) => {
          return product.trim();
        });

        let products = await ProductsService.getProducts();

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
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.response?.data);
        }
        await params.injectMessage("I something went wrong.");
      }
    },

    chatDisabled: true,
    path: "getInstruction",
  },
};
