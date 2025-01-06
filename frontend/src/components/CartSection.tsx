import { useCartStore } from "../stores/cart.store";
import { EmptyProduct, ListCartProducts, ShowTotal } from "./";

interface Props {
  toggleModal: () => void;
}
export const CartSection = ({ toggleModal }: Props) => {
  const cart = useCartStore((state) => state.cart);
  const totalQuantity = useCartStore((state) => state.totalQuantity);
  const productsInCart = Object.values(cart);
  const keys = Object.keys(cart);
  return (
    <section className="cart-section">
      <h3>
        You Cart (<span className="total-quantity">{totalQuantity()}</span>)
      </h3>
      <article className="cart">
        {keys.length < 1 ? (
          <EmptyProduct />
        ) : (
          <>
            <ListCartProducts productsInCart={productsInCart} />
            <ShowTotal toggleModal={toggleModal} />
          </>
        )}
      </article>
    </section>
  );
};
