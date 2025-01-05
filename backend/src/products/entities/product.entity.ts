import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Prop()
  price: number;

  @Prop({
    type: Object,
  })
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };

  @Prop()
  category: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
