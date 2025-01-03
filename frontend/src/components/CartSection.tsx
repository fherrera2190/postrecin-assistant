import { useContext } from "react";
import CartContext from "../context/cart/CartContext";
import { EmptyProduct, ListCartProducts, ShowTotal } from "./";
import { ProductInCart } from "../interfaces";

interface Props {
  toggleModal: () => void;
}
export const CartSection = ({ toggleModal }: Props) => {
  const { state, total, quantity } = useContext(CartContext);
  const keys = Object.keys(state);
  const productsInCart: ProductInCart[] = Object.values(state);

  return (
    <section className="cart-section">
      <h3>
        You Cart (<span className="total-quantity">{quantity}</span>)
      </h3>
      <article className="cart">
        {keys.length < 1 ? (
          <EmptyProduct />
        ) : (
          <>
            <ListCartProducts productsInCart={productsInCart} />
            <ShowTotal total={total} toggleModal={toggleModal} />
          </>
        )}
      </article>
    </section>
  );
};
