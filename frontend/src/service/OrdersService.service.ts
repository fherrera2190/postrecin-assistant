import {
  CreateOrderResponse,
  DataSendOrder,
  ProductInCart,
} from "../interfaces";
import { HttpService } from "./HttpService.service";

export class OrdersService {
  private static httpService = new HttpService("/orders");

  static async createOrder(
    cart: ProductInCart[]
  ): Promise<CreateOrderResponse> {
    const { data } = await this.httpService.post<
      CreateOrderResponse,
      DataSendOrder
    >("/", { cart });
    return data;
  }
}
