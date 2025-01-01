import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private readonly productModel) {}

  async findAll() {
    const products = await this.productModel.find({}).select('-__v');
    return products;
  }

  async findOne(name: string) {
    console.log(name);
    const products = await this.productModel
      .find({ nombre: { $regex: `.*${name}.*`, $options: 'i' } })
      .select('-__v');
    return products;
  }
}
