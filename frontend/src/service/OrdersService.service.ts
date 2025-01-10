import { CreateOrderResponse, ProductInCart } from "../interfaces";
import { HttpService } from "./HttpService.service";

export class OrdersService {
  private static httpService = new HttpService("/orders");

  static async createOrder(
    cart: ProductInCart[]
  ): Promise<CreateOrderResponse> {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>", cart);

    const { data } = await this.httpService.post<
      CreateOrderResponse,
      ProductInCart[]
    >("/", cart);
    return data;
  }
}
