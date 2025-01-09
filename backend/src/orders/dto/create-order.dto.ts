import { IsArray, IsOptional, IsString } from 'class-validator';
import { ProductInCart } from 'src/common/interfaces';

export class CreateOrderDto {
  //Lo puse opcional, por que no tengo userId en el front
  @IsString()
  @IsOptional()
  userId?: string;
  @IsArray()
  cart: ProductInCart[];
}
