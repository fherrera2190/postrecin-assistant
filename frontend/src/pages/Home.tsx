import { useEffect, useState } from "react";
import { BuyModal, CartSection, ListProducts } from "../components";
import { MyChatBot } from "../components/MyChatBot";
import appApi from "../api/appAPi";

export const Home = () => {
  const [modal, setModal] = useState(false);
  const [products, setProducts] = useState([]);
  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    appApi
      .get("/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
