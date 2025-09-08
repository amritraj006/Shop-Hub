import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { useAppContext } from "../contexts/AppContext";
import { DeleteIcon, X } from "lucide-react";
import { toast } from "sonner";

const Cart = () => {
  const { user, isLoaded } = useUser();
  const { openCart, setOpenCart, setCartCount, triggerCartUpdate } =
    useAppContext();
  const [cartItems, setCartItems] = useState([]);
  const [discountApplied, setDiscountApplied] = useState(false);
  const cartRef = useRef();

  // Fetch cart items when sidebar opens
  useEffect(() => {
    if (!isLoaded || !user || !openCart) return;
    axios
      .get(`/api/cart/${user.id}`)
      .then((res) => setCartItems(res.data.cart || []))
      .catch((err) => console.error("Cart fetch failed:", err));
  }, [isLoaded, user, openCart]);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openCart, setOpenCart]);

  // Update quantity
  const handleQuantityChange = async (productId, newQty) => {
    if (newQty < 1 || newQty > 10) return;
    try {
      const res = await axios.put("/api/cart/update", {
        userId: user.id,
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
      const res = await axios.delete("/api/cart/remove", {
        data: { userId: user.id, productId },
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
      acc + (item.product?.price || item.productId?.price || 0) * item.quantity,
    0
  );

  // Final price (₹150 off if >= 1000)
  const finalPrice = discountApplied ? Math.max(totalPrice - 150, 0) : totalPrice;

  // Toggle discount
  const handleToggleDiscount = () => {
    if (totalPrice < 1000) {
      toast.error("⚠️ Spend at least ₹1000 to unlock the offer");
      return;
    }
    setDiscountApplied((prev) => !prev);
    toast.success(
      !discountApplied ? "🎉 ₹150 discount applied!" : "❌ Discount removed."
    );
  };

  // Reset discount if cart goes below 1000
  useEffect(() => {
    if (totalPrice < 1000 && discountApplied) {
      setDiscountApplied(false);
      toast.error("Discount removed (Cart below ₹1000)");
    }
  }, [totalPrice, discountApplied]);

  return (
    <div
      className={`fixed inset-0 z-50 flex transition-opacity duration-300 ${
        openCart ? "opacity-100 visible" : "opacity-0 invisible"
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
            <p className="text-gray-500 dark:text-gray-400">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => {
              const product = item.product || item.productId;
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
                          handleQuantityChange(product._id, item.quantity - 1)
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
                          handleQuantityChange(product._id, item.quantity + 1)
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

        {/* Total + Offer + Checkout */}
        {cartItems.length > 0 && (
          <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex justify-between mb-2 text-gray-700 dark:text-gray-300">
              <span>Subtotal</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>

            {discountApplied && (
              <div className="flex justify-between mb-2 text-green-600 dark:text-green-400">
                <span>Discount</span>
                <span>- ₹150.00</span>
              </div>
            )}

            {/* Offer Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleDiscount();
              }}
              className={`w-full py-2 mb-3 rounded-lg font-medium transition text-sm ${
                discountApplied
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : totalPrice >= 1000
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
              }`}
            >
              {discountApplied
                ? "✅ ₹150 Discount Applied (Click to Remove)"
                : "🎁 Get ₹150 Off (Spend ₹1000+)"}
            </button>

            {/* Final Total */}
            <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              <span>Final Total</span>
              <span>₹{finalPrice.toFixed(2)}</span>
            </div>

            <button
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white rounded-lg font-medium transition"
              onClick={(e) => {
                e.stopPropagation();
                alert("Proceeding to Checkout 🚀");
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
