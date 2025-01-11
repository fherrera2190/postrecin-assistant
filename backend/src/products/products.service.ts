import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
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
    try {
      const products: Product[] = await this.productModel
        .find({})
        .lean()
        .select('-__v -createdAt -updatedAt');
      return products;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async update(_id: string, updateProductDto: any) {
    try {
      const product = await this.productModel.findOneAndUpdate(
        { _id },
        updateProductDto,
      );
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return {
        message: 'Product updated successfully',
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async deleteOne(id: string) {
    try {
      const product = await this.productModel.findOneAndDelete({ _id: id });
      if (!product)
        throw new NotFoundException(`Product with ID ${id} not found`);

      return {
        message: 'Product deleted successfully',
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any) {
    this.logger.error(error);
    if (error.code === 11000) {
      throw new BadRequestException(
        `Product exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw error;
  }
}
