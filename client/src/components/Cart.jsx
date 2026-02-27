import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAppContext } from "../contexts/AppContext";
import { DeleteIcon, X } from "lucide-react";
import { toast } from "sonner";

const Cart = () => {
  const {
    user,
    isLoaded,
    openCart,
    setOpenCart,
    setCartCount,
    triggerCartUpdate,
    API_URL,
  } = useAppContext();

  const [cartItems, setCartItems] = useState([]);
  const cartRef = useRef(null);

  // Fetch cart items when sidebar opens
  useEffect(() => {
    if (!isLoaded || !user || !openCart) return;

    axios
      .get(`${API_URL}/cart/${user._id}`)
      .then((res) => setCartItems(res.data.cart || []))
      .catch((err) => console.error("Cart fetch failed:", err));
  }, [isLoaded, user, openCart, API_URL]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setOpenCart(false);
      }
    };

    if (openCart) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [openCart, setOpenCart]);

  // Update quantity
  const handleQuantityChange = async (productId, newQty) => {
    if (newQty < 1 || newQty > 10) return;

    try {
      const res = await axios.put(`${API_URL}/cart/update`, {
        userId: user._id,
        productId,
        quantity: newQty,
      });

      setCartItems(res.data.cart || []);
      setCartCount(res.data.cart?.length || 0);
      triggerCartUpdate();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  // Remove product
  const handleRemove = async (productId) => {
    try {
      const res = await axios.delete(`${API_URL}/cart/remove`, {
        data: { userId: user._id, productId },
      });

      setCartItems(res.data.cart || []);
      setCartCount(res.data.cart?.length || 0);
      triggerCartUpdate();
      toast.success("🗑️ Product removed from cart");
    } catch (err) {
      console.error("Remove failed:", err);
    }
  };

  // Cart total
  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc +
      (item.product?.price || item.productId?.price || 0) * item.quantity,
    0
  );

  return (
    <div
      className={`fixed inset-0 z-50 flex transition-opacity duration-300 ${openCart ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>

      {/* Cart Sidebar */}
      <div
        ref={cartRef}
        className={`ml-auto w-96 max-w-full h-full bg-white dark:bg-gray-900 shadow-2xl flex flex-col p-5 relative z-50 
        transform transition-transform duration-300 ease-in-out
        ${openCart ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5 border-b pb-3 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            🛒 My Cart
          </h2>
          <button
            onClick={() => setOpenCart(false)}
            className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
          >
            <X />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto pr-2">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              Your cart is empty.
            </p>
          ) : (
            cartItems.map((item) => {
              const product = item.product || item.productId;
              if (!product) return null; // Defensive check for orphaned items

              return (
                <div
                  key={product._id}
                  className="flex items-center gap-3 mb-4 border-b border-gray-200 dark:border-gray-700 pb-3"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-md shadow-sm"
                  />

                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {product.name}
                    </h3>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      ₹{product.price} × {item.quantity} ={" "}
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ₹{(product.price * item.quantity).toFixed(2)}
                      </span>
                    </p>

                    <div className="flex items-center gap-2 mt-2 text-sm">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            product._id,
                            item.quantity - 1
                          )
                        }
                        className="px-2 py-1 border rounded-md text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        -
                      </button>

                      <span className="w-6 text-center text-gray-800 dark:text-gray-200">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          handleQuantityChange(
                            product._id,
                            item.quantity + 1
                          )
                        }
                        className="px-2 py-1 border rounded-md text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        +
                      </button>

                      <button
                        onClick={() => handleRemove(product._id)}
                        className="ml-3 text-red-500 hover:underline flex items-center gap-1"
                      >
                        <DeleteIcon size={14} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Total + Checkout */}
        {cartItems.length > 0 && (
          <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              <span>Total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>

            <button
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white rounded-lg font-medium transition"
              onClick={(e) => {
                e.stopPropagation();
                setOpenCart(false);
                window.location.href = "/checkout"; // force clean router navigation mapping
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;