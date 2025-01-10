import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private readonly productModel) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const newProduct = new this.productModel(createProductDto);
      await newProduct.save();
      return newProduct;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    const products = await this.productModel
      .find({})
      .lean()
      .select('-__v -createdAt -updatedAt');
    return products;
  }

  async update(_id: string, updateProductDto: any) {
    try {
      const product = await this.productModel.findOneAndUpdate(
        { _id },
        updateProductDto,
      );
      if (!product) {
        throw new BadRequestException('Product not found');
      }
      return {
        message: 'Product updated successfully',
      };
    } catch (error) {
      return error.response;
    }
  }

  async deleteOne(id: string) {
    try {
      const product = await this.productModel.findOneAndDelete({ _id: id });
      if (!product) {
        throw new BadRequestException('Product not found');
      }
      return {
        message: 'Product deleted successfully',
      };
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Product exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
