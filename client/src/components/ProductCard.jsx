import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useAppContext } from "../contexts/AppContext";
import { toast } from "sonner";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const { setCartCount, cartUpdated } = useAppContext();

  const [inCart, setInCart] = useState(false);

  // Check if product is in cart
  useEffect(() => {
    if (!isLoaded || !user) return;
    axios.get(`/api/cart/${user.id}`)
      .then(res => setInCart(res.data.cart.some(item => item.product._id === product._id)))
      .catch(err => console.error(err));
  }, [isLoaded, user, product._id, cartUpdated]);

  const handleToggleCart = async (e) => {
    e.stopPropagation();
    if (!user) return alert("Please log in to add items to your cart.");

    try {
      const res = await axios.post("/api/cart/toggle", {
        userId: user.id,
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
      className="cursor-pointer hover:scale-105 transition transform duration-300"
    >
      <div className="flex flex-col bg-white shadow-md w-72">
        <img className="w-72 h-48 object-cover" src={product.image} alt={product.name} />
        <div className="p-4 text-sm">
          <p className="text-slate-600">$ {product.price}</p>
          <p className="text-slate-800 text-base font-medium my-1.5">{product.name}</p>
          <p className="text-slate-600">
            Size: <span className="font-medium">{product.size}</span> | 
            Stock: <span className="font-medium">{product.stock}</span>
          </p>
          <p className="text-slate-500">{product.description}</p>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              onClick={handleToggleCart}
              className={`py-2 ${inCart ? "bg-gray-500 text-white" : "bg-slate-100 text-slate-600"}`}
            >
              {inCart ? "Added" : "Add to Cart"}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(`/checkout/${product._id}`); }}
              className="bg-slate-800 text-white py-2"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
