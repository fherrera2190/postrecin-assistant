import { Product } from "../interfaces";
import { CardBody, CardFooter, CardHeader } from "./";
import ProductContext from "../context/product/ProductContext";
import { useProduct } from "../hooks";

interface Props {
  product: Product;
}

export const CardProduct = ({ product }: Props) => {
  const { counter, increaseBy } = useProduct({
    product,
  });

  return (
    <ProductContext.Provider value={{ counter, increaseBy }}>
      <div className="card">
        <CardHeader image={product.image} />
        <CardBody name={product.name} category={product.category} />
        <CardFooter price={product.price} />
      </div>
    </ProductContext.Provider>
  );
};
