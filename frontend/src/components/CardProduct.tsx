import { Product } from "../interfaces";
import { CardBody, CardFooter, CardHeader } from "./";
import ProductContext from "../context/product/ProductContext";
import { useProduct } from "../hooks";

interface Props {
  product: Product;
}

export const CardProduct = ({ product }: Props) => {
  const { id, image, name, category, price } = product;

  const { counter, increaseBy } = useProduct({});

  return (
    <ProductContext.Provider value={{ counter, increaseBy }}>
      <div className="card">
        <CardHeader id={id} image={image} />
        <CardBody name={name} category={category} />
        <CardFooter price={price} />
      </div>
    </ProductContext.Provider>
  );
};
