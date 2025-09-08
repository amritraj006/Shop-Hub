import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [openSearch, setOpenSearch] = useState(false);
  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [openCart, setOpenCart] = useState(false);
  const [cartUpdated, setCartUpdated] = useState(0); // triggers cart updates

  const { user, isLoaded } = useUser();

  const triggerCartUpdate = () => setCartUpdated(prev => prev + 1);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      setProductLoading(true);
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setProductLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch cart count when user logs in or cart updates
  useEffect(() => {
    const fetchCartCount = async () => {
      if (!isLoaded || !user) return setCartCount(0);
      try {
        const res = await axios.get(`/api/cart/${user.id}`);
        setCartCount(res.data.cart?.length || 0);
      } catch (err) {
        console.error("Fetch cart count error:", err.message);
      }
    };
    fetchCartCount();
  }, [isLoaded, user, cartUpdated]);

  return (
    <AppContext.Provider
      value={{
        openSearch,
        setOpenSearch,
        products,
        productLoading,
        cartCount,
        setCartCount,
        openCart,
        setOpenCart,
        cartUpdated,
        triggerCartUpdate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
