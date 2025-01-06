export const BtnConfirmOrder = ({
  toggleModal,
}: {
  toggleModal: () => void;
}) => {
  return (
    <button className="btn_generic" onClick={toggleModal}>
      Confirm Order
    </button>
  );
};
