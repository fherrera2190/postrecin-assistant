export const EmptyProduct = () => {
  return (
    <div className="cart-empty-product">
      <figure>
        <img src="./assets/images/illustration-empty-cart.svg" alt="no product in cart" />
        <figcaption>
          <small>your added items will appear here</small>
        </figcaption>
      </figure>
    </div>
  );
};
