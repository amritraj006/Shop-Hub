import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const AppContext = createContext();

// API URL based on environment
const API_URL = "http://localhost:3000/api"

export const AppProvider = ({ children }) => {
  const [openSearch, setOpenSearch] = useState(false);
  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [openCart, setOpenCart] = useState(false);
  const [cartUpdated, setCartUpdated] = useState(0); // triggers cart updates

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("shopToken") || null);
  const [isLoaded, setIsLoaded] = useState(false);

  const triggerCartUpdate = () => setCartUpdated(prev => prev + 1);

  // Set default axios header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Fetch Current User
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setIsLoaded(true);
        return;
      }
      try {
        const { data } = await axios.get(`${API_URL}/auth/me`);
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching user", error);
        setUser(null);
        setToken(null);
        localStorage.removeItem("shopToken");
      } finally {
        setIsLoaded(true);
      }
    };
    fetchUser();
  }, [token]);

  // Auth Functions
  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("shopToken", data.token);
        toast.success("Logged in successfully");
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/register`, { name, email, password });
      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("shopToken", data.token);
        toast.success("Registered successfully");
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("shopToken");
    setCartCount(0); // Clear cart count on logout
    toast.success("Logged out successfully");
  };

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      setProductLoading(true);
      try {
        const res = await axios.get(`${API_URL}/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Fetch products error:", err.message);
      } finally {
        setProductLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch cart count when user logs in or cart updates
  useEffect(() => {
    const fetchCartCount = async () => {
      if (!user) {
        setCartCount(0);
        return;
      }
      try {
        const res = await axios.get(`${API_URL}/cart/${user._id}`);
        setCartCount(res.data.cart?.length || 0);
      } catch (err) {
        console.error("Fetch cart count error:", err.message);
      }
    };
    fetchCartCount();
  }, [user, cartUpdated]);

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
        API_URL,
        user,
        setUser,
        token,
        isLoaded,
        login,
        register,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
