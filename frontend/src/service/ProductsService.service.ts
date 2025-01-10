import { Product } from "../interfaces";
import { HttpService } from "./HttpService.service";

export class ProductsService {
  private static httpService = new HttpService("/products");

  static async getProducts(): Promise<Product[]> {
    const { data } = await this.httpService.get<Product[]>("/");
    return data;
  }
}
