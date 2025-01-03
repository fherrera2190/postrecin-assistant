import { useContext } from "react";
import { ProductImage } from "../interfaces";
import { ButtonAddProduct, ButtonIncDecProduct } from "./";
import CartContext from "../context/cart/CartContext";

interface Props {
  image: ProductImage;
  id: string;
}

export const CardHeader = ({ image, id }: Props) => {
  const { state } = useContext(CartContext);
  const counter = state[id]?.quantity || 0;

  return (
    <div className="card__header">
      <picture>
        <source srcSet={image.desktop} media="(min-width: 769px)" />
        <source
          srcSet={image.tablet}
          media="(max-width: 768px) and (min-width: 376px)"
        />
        <img
          src={image.mobile}
          alt="product image"
          className={`card__image ${counter > 0 ? "img__select" : ""}`}
        />
      </picture>

      {counter < 1 ? <ButtonAddProduct /> : <ButtonIncDecProduct />}
    </div>
  );
};
