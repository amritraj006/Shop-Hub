import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../contexts/AppContext";
import { toast } from "sonner";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { setCartCount, cartUpdated, API_URL, user, isLoaded } = useAppContext();

  const [inCart, setInCart] = useState(false);

  // Check if product is in cart
  useEffect(() => {
    if (!isLoaded || !user) return;
    axios.get(`${API_URL}/cart/${user._id}`)
      .then(res => setInCart(res.data.cart.some(item => item.product._id === product._id)))
      .catch(err => console.error(err));
  }, [isLoaded, user, product._id, cartUpdated, API_URL]);

  const handleToggleCart = async (e) => {
    e.stopPropagation();
    if (!user) return alert("Please log in to add items to your cart.");

    try {
      const res = await axios.post(`${API_URL}/cart/toggle`, {
        userId: user._id,
        productId: product._id,
      });
      setInCart(res.data.inCart);
      toast.success(res.data.message);
      setCartCount(res.data.cart.length);
    } catch (err) {
      console.error("Cart toggle error:", err.message);
    }
  };

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="group cursor-pointer hover:-translate-y-2 transition-all duration-500 h-full flex"
    >
      <div className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-500 h-full w-full sm:w-72 mx-auto">
        <div className="relative overflow-hidden w-full h-48 sm:h-56 bg-gray-100 dark:bg-gray-800">
          <img
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            src={product.image}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <p className="text-gray-900 dark:text-white text-lg font-semibold line-clamp-1">{product.name}</p>
            <p className="text-emerald-600 dark:text-emerald-400 font-bold whitespace-nowrap ml-2">${product.price}</p>
          </div>

          <div className="flex text-xs text-gray-500 dark:text-gray-400 space-x-2 mb-3">
            <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md font-medium">Size: {product.size}</span>
            <span className={`px-2 py-1 rounded-md font-medium ${product.stock > 0 ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
              {product.stock > 0 ? `Stock: ${product.stock}` : 'Out of Stock'}
            </span>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4 flex-grow">{product.description}</p>

          <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={handleToggleCart}
              className={`py-2 px-3 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center ${inCart ? "bg-gray-800 dark:bg-gray-600 text-white shadow-md hover:shadow-lg" : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"}`}
            >
              {inCart ? "In Cart" : "Add to Cart"}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!user) return toast.error("Please log in to purchase items.");
                navigate("/checkout", { state: { buyNowProduct: product, buyNowQuantity: 1 } });
              }}
              className="bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white py-2 px-3 rounded-xl font-medium text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
