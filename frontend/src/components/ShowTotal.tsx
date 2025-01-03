export const ShowTotal = ({
  total,
  toggleModal,
}: {
  total: number;
  toggleModal: () => void;
}) => {
  return (
    <>
      <div className="cart-total">
        <p>
          <small>Order Total</small>
        </p>
        <h4 className="total-price">${total}</h4>
      </div>
      <div className="delivery">
        <div>
          <img
            src="./assets/images/icon-carbon-neutral.svg"
            alt="Carbon Neutral"
          />
        </div>
        <p>
          <small>
            This is a <b>carbon-neutral</b> delivery
          </small>
        </p>
      </div>
      <button className="btn_generic" onClick={toggleModal}>
        Confirm Order
      </button>
    </>
  );
};
