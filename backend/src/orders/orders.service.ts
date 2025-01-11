import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Product } from 'src/products/entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderItem } from './entities/orderItem.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectModel(Product.name)
    private readonly productsModel: Model<Product>,
    @InjectModel(Order.name) private readonly ordersModel: Model<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const { cart } = createOrderDto;
      if (!cart || cart.length === 0) {
        throw new BadRequestException(
          'The cart is empty. Cannot create an order.',
        );
      }
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

      const order = new this.ordersModel({
        userId: 'userTest',
        total,
        items: orderItems,
      });

      order.orderId = order._id.toString().substring(0, 8);

      const result = await order.save();
      return result;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any) {
    this.logger.error(error);
    throw error;
  }
}
