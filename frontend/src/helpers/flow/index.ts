import { Flow } from "react-chatbotify";
import { deleteCart } from "./deleteCart";
import { end } from "./end";
import { getInstruction } from "./getInstruction";
import { showCart } from "./showCart";
import { showProducts } from "./showProducts";
import { start } from "./start";
import { unknownCommand } from "./unknownCommand";

export const flow: Flow = {
  ...deleteCart,
  ...end,
  ...getInstruction,
  ...showCart,
  ...showProducts,
  ...start,
  ...unknownCommand,
};
