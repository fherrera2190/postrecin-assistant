/* eslint-disable @typescript-eslint/no-explicit-any */
const cart: any = [];


export const flow = {
  start: {
    message: "Hi there! How can I help you?",
    options: [
      "Show Products",
      "Show Cart",
      "Ask me something",
      "Confirm Order",
      "exit",
    ],
    path: (params: any) => {
      switch (params.userInput) {
        case "Show Products":
          return "showProducts";

        case "Show Cart":
          return "showCart";

        case "Confirm Order":
          return "confirmOrder";

        case "exit":
          return "end";

        default:
          return "";
      }
    },
  },

  showProducts: {
    message: "Select a product:",
    checkboxes: async () => {
      const response = await fetch("http://localhost:3000/products");
      let products = await response.json();
      products = products.map((product: any) => product.nombre);

      return products;
    },
    options: ["cancel"],

    function: (params: any) => {
      const selecProducts = params.userInput.split(",");

      for (const product of selecProducts) {
        // cart.push({ product: product.trim(), quantity: 1 });
        // params.injectMessage(`Has added 1 ${product}`);
        console.log(product);
      }
    },

    path: (params: any) => {
      if (params.userInput === "cancel") {
        return "start";
      }
      return "selecQuantity";
    },
  },
  showCart: {
    message: async (params: any) => {
      if (cart.length === 0) {
        await params.injectMessage("Your cart is empty");
        await params.goToPath("start");
      } else {
        const response = await fetch("http://localhost:3000/products");
        let products = await response.json();
        const cartProducts = cart.map((product: any) => product.product);

        products = products.filter((product: any) => {
          console.log(product.nombre);
          if (cartProducts.includes(product.nombre)) return product;
        });

        console.log(products);
        let respuesta = "";
        for (const product of cart) {
          respuesta += `${product.product} x ${product.quantity}\n`;
        }
        params.injectMessage(respuesta);
        await params.goToPath("start");
      }
    },

    path: "start",
  },
  selecQuantity: {
    message: async (params: any) => {
      const selecProducts = params.userInput.split(",");
      for (const product of selecProducts) {
        cart.push({ product: product.trim(), quantity: 1 });
        params.injectMessage(`Has added 1 ${product}`);
      }

      return "Do you want to change the quantity or go to the main menu?";
    },
    options: ["Yes, I want to change the quantity", "No, go to the main menu"],
    path: async (params: any) => {
      if (params.userInput === "Yes, I want to change the quantity") {
        return "ask_age";
      }

      return "start";
    },
  },
  ask_age: {
    message: "Please enter the quantity:",
    // function: (params:any) => setForm({ ...form, age: params.userInput }),
    path: async (params: any) => {
      if (isNaN(Number(params.userInput))) {
        await params.injectMessage("Age needs to be a number!");
        return;
      }
      return "start";
    },
  },
  end: {
    message: "Thank you for your interest, we will get back to you shortly!",

    options: ["Start new conversation!"],
    path: "start",
  },
};
