import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({
    unique: true,
    index: true,
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  price: number;

  @Prop({
    type: Object,
  })
  image?: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };

  @Prop()
  category: string;

  @Prop()
  ingredients?: string[];

  @Prop()
  calories: number;

  @Prop()
  popularity: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
