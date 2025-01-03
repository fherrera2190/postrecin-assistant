import { ProductInCart } from "../interfaces";

export const ListOrderProducts = ({
  productsInCart,
}: {
  productsInCart: ProductInCart[];
}) => {
  return (
    <>
      {productsInCart.map((product: ProductInCart) => (
        <div key={product.id} className="order-product">
          <img src={product.image.thumbnail} alt="" />
          <div className="order-info">
            <h5>${product.name}</h5>
            <p>
              <small className="quantity-order-product">
                ${product.quantity}x{" "}
              </small>
              <small className="price-order-product">
                @ ${parseFloat(product.price + "").toFixed(2)}
              </small>
            </p>
          </div>
          <p>
            ${parseFloat(product.quantity * product.price + "").toFixed(2)}
          </p>
        </div>
      ))}
    </>
  );
};
