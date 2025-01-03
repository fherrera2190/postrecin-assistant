import "./assets/css/style.css";
import { CartProvider } from "./context";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <CartProvider>
        <Home />
      </CartProvider>
    </>
  );
}

export default App;
