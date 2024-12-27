import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  nombre: string;
  @Prop()
  descripcion: string;
  @Prop()
  precio: number;
  @Prop()
  procedencia: string;
  @Prop()
  ingredientes: string[];
  @Prop()
  popularidad: number;
  @Prop()
  vegetariano: boolean;
  @Prop()
  stock: number;
  @Prop()
  imagen: string;
  @Prop()
  calorias: number;
  @Prop()
  categoria: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
