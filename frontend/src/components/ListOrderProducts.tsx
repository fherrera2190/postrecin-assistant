import { ProductInCart } from "../interfaces";
import { useCartStore } from "../stores/cart.store";

export const ListOrderProducts = () => {
  const cart = useCartStore((state) => state.cart);
  const productsInCart = Object.values(cart);
  return (
    <>
      {productsInCart.map((product: ProductInCart) => (
        <div key={product._id} className="order-product">
          <img src={product.image.thumbnail} alt="" />
          <div className="order-info">
            <h5>${product.name}</h5>
            <p>
              <small className="quantity-order-product">
                ${product.quantity} x
              </small>
              <small className="price-order-product">
                @ ${parseFloat(product.price + "").toFixed(2)}
              </small>
            </p>
          </div>
          <p>${parseFloat(product.quantity * product.price + "").toFixed(2)}</p>
        </div>
      ))}
    </>
  );
};
