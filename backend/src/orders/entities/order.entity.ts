import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderItem } from './orderItem.entity';

@Schema({ timestamps: true })
export class Order {
  @Prop()
  userId: string;

  @Prop({
    enum: ['placed', 'shipped', 'delivered', 'cancelled', 'returned'],
    default: 'placed',
  })
  status: string;

  @Prop()
  total: number;

  @Prop()
  items: OrderItem[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
