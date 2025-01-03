import { useState } from "react";
import { BuyModal, CartSection, ListProducts } from "../components";
import products from "../data/data.json";
import { ChatbotIA } from "../components/ChatbotIA";
import { MyChatBot } from "../components/MyChatBot";

export const Home = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <main>
        <section className="products-section">
          <h1>Desserts</h1>
          <ListProducts products={products} />
        </section>
        <CartSection toggleModal={toggleModal} />
      </main>
      <footer>
        <MyChatBot />
      </footer>

      <BuyModal modal={modal} />
    </>
  );
};
