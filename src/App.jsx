import { useEffect, useState } from "react";
import { commerce } from "./lib/commerce";
import { Routes, Route, Navigate } from "react-router-dom";
import { Cart, Checkout, Navbar, Products } from "./components";
import "./components/styles.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const cart = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const cart = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const cart = await commerce.cart.remove(productId);
    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const cart = await commerce.cart.empty();
    setCart(cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <div>
      <div className="navbar">
        <Navbar cartItems={cart?.total_items} />
      </div>

      <Routes>
        <Route path="/" element={<Navigate to={"/products"} />} />
        <Route
          path="/products"
          element={
            <Products products={products} onAddToCart={handleAddToCart} />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              onCartUpdateQty={handleUpdateCartQty}
              onCartItemRemove={handleRemoveFromCart}
              onCartEmpty={handleEmptyCart}
            />
          }
        />
        <Route
          path={"/checkout"}
          element={
            <Checkout
              cart={cart}
              onCaptureCheckout={handleCaptureCheckout}
              order={order}
              errorMessage={errorMessage}
            />
          }
        />
        <Route path={"/*"} element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
