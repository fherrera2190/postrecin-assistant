import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private readonly productModel) {}

  async findAll() {
    const products = await this.productModel.find({}).select('-__v');
    return products;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }
}
