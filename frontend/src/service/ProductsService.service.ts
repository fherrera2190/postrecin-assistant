import { Product } from "../interfaces";
import { HttpService } from "./HttpService.service";

export class ProductsService {
  private httpService = new HttpService("/products");

  public async getProducts(): Promise<Product[]> {
    const { data } = await this.httpService.get<Product[]>("/");
    return data;
  }
}
