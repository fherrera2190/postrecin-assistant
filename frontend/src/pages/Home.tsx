import { useEffect, useState } from "react";
import { BuyModal, CartSection, ListProducts } from "../components";
import { MyChatBot } from "../components/MyChatBot";
import { ProductsService } from "../service/ProductsService.service";
import { Product } from "../interfaces";

export const Home = () => {
  const productsService = new ProductsService();
  const [modal, setModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    productsService
      .getProducts()
      .then((res) => {
        setProducts(res);
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
