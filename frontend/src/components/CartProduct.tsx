import { ProductInCart } from "../interfaces";
import { useCartStore } from "../stores/cart.store";

interface Props {
  product: ProductInCart;
}

export const CartProduct = ({ product }: Props) => {
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <div className="product-select">
      <div className="product-detail">
        <h5 className="product-name">{product.name}</h5>
        <div className="product-total">
          <p className="product-quantity">
            <small className="quantityValue-${id}">{product.quantity}</small>
            <small>x</small>
          </p>
          <p className="product-price">
            <small>@ ${product.price}</small>
          </p>
          <p>
            <small className="product-subtotal-${id}">
              ${product.quantity * product.price}
            </small>
          </p>
        </div>
      </div>
      <button
        className="remove-button"
        onClick={() => removeFromCart(product._id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          fill="none"
          viewBox="0 0 10 10"
        >
          <path
            fill="#CAAFA7"
            d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
          />
        </svg>
      </button>
    </div>
  );
};
