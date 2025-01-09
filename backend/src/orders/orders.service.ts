import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Product } from 'src/products/entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderItem } from './entities/orderItem.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Product.name)
    private readonly productsModel: Model<Product>,
    @InjectModel('Order') private readonly ordersModel,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { cart } = createOrderDto;

    const orderItems: OrderItem[] = [];
    let total = 0;
    for (const item of cart) {
      const product = await this.productsModel.findById(item._id).lean();
      if (!product) {
        throw new NotFoundException(`Product with ID ${item._id} not found`);
      }
      const quantity = item.quantity;
      const price = product.price;
      const orderItem = new OrderItem({
        name: product.name,
        price,
        quantity,
      });

      orderItems.push(orderItem);
      total += price * quantity;
    }

    const order = this.ordersModel.create({
      userId: 'userTest',
      total,
      items: orderItems,
    });

    return order;
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    void updateOrderDto;
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
