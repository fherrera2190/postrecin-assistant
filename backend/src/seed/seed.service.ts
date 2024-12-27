import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { sushis } from './data/sushis';
@Injectable()
export class SeedService {
  constructor(@InjectModel('Product') private readonly productModel) {}

  async run() {
    try {
      await this.productModel.deleteMany({});

      await this.productModel.insertMany(sushis);

      return {
        seed: 'ok',
      };
    } catch (error) {
      console.log(error);
    }
  }
}
