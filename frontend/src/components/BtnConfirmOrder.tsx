import { AxiosError } from "axios";
import { OrdersService } from "../service/OrdersService.service";
import { useCartStore } from "../stores/cart.store";

interface Props {
  toggleModal: () => void;
}

export const BtnConfirmOrder = ({ toggleModal }: Props) => {
  const cart = useCartStore((state) => state.cart);

  const confirmPurchase = async () => {
    try {
      const order = await OrdersService.createOrder(Object.values(cart));
      console.log(order);
      toggleModal();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }
    }
  };

  return (
    <button className="btn_generic" onClick={confirmPurchase}>
      Confirm Order
    </button>
  );
};
