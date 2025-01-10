import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsNumber()
  price: number;
  @IsString()
  category: string;
  @IsArray()
  @IsOptional()
  ingredients: string[];
  @IsNumber()
  popularity: number;
  @IsNumber()
  calories: number;
  @IsOptional()
  @IsObject()
  image?: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
}
