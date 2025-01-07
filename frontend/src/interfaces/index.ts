export interface Product {
  _id: string;
  image: ProductImage;
  name: string;
  category: string;
  price: number;
}

export interface ProductImage {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface ProductInCart extends Product {
  quantity: number;
}

export interface GetInstructionResponse {
  ok: boolean;
  data: GetInstructionData;
}

export interface GetInstructionData {
  instruction: string;
}

export interface GetQuestionResponse {
  ok: boolean;
  data: GetQuestionResponseData;
}

export interface GetQuestionResponseData {
  response: string;
}
