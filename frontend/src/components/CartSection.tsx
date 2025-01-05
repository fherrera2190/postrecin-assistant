import { EmptyProduct, ListCartProducts, ShowTotal } from "./";

interface Props {
  toggleModal: () => void;
}
export const CartSection = ({ toggleModal }: Props) => {
  const keys = [1];
  const productsInCart = [];
  return (
    <section className="cart-section">
      <h3>
        You Cart (<span className="total-quantity">{60}</span>)
      </h3>
      <article className="cart">
        {keys.length < 1 ? (
          <EmptyProduct />
        ) : (
          <>
            <ListCartProducts productsInCart={productsInCart} />
            <ShowTotal total={5000} toggleModal={toggleModal} />
          </>
        )}
      </article>
    </section>
  );
};
