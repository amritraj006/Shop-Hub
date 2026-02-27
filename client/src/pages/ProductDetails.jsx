import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import Loading from "../components/Loading";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductCard from "../components/ProductCard";
import { MoveRightIcon } from "lucide-react";


const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, setCartCount, cartUpdated, API_URL, user, isLoaded } = useAppContext();

  const [product, setProduct] = useState(null);
  const [inCart, setInCart] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Fetch product from context or API if not found
  useEffect(() => {
    const foundProduct = products.find((p) => p._id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // Fetch single product from backend
      const fetchProduct = async () => {
        try {
          const res = await axios.get(`${API_URL}/products/${id}`);
          setProduct(res.data.product);
        } catch (err) {
          console.error("Failed to fetch product:", err);
        }
      };
      fetchProduct();
    }
  }, [id, products, API_URL]);

  // Check if product is in cart
  useEffect(() => {
    if (!isLoaded || !user || !product) return;
    axios
      .get(`${API_URL}/cart/${user._id}`)
      .then((res) => {
        setInCart(res.data.cart.some((item) => item.product._id === product._id));
      })
      .catch((err) => console.error(err));
  }, [isLoaded, user, product, cartUpdated, API_URL]);

  const allImages = product
    ? [product.image, ...Object.values(product.secondaryImages || {})]
    : [];

  // Toggle Add/Remove Cart
  const handleToggleCart = async () => {
    if (!user) return toast.error("Please log in to add items to your cart.");

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/cart/toggle`, {
        userId: user._id,
        productId: product._id,
        quantity,
      });

      setInCart(res.data.inCart);
      setCartCount(res.data.cart.length);
      toast.success(res.data.message);
    } catch (err) {
      console.error("Toggle cart error:", err.response?.data || err.message);
      toast.error("Failed to update cart");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (change) => {
    const newQty = quantity + change;
    if (newQty >= 1 && newQty <= 10) setQuantity(newQty);
  };

  if (!product) return <Loading />;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p._id !== product._id)
    .slice(0, 4);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-32 py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex flex-col md:flex-row gap-6 lg:gap-10">
        {/* Images */}
        <div className="md:w-1/2">
          <div className="sticky top-24">
            <div className="w-full h-80 md:h-96 lg:h-[450px] overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 mb-6 relative group">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <img
                src={allImages[selectedImage]}
                alt={product.name}
                className={`w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-[1.03] ${imageLoading ? "opacity-0" : "opacity-100"
                  }`}
                onLoad={() => setImageLoading(false)}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://via.placeholder.com/600x400?text=No+Image";
                  setImageLoading(false);
                }}
                loading="lazy"
              />
            </div>

            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedImage(index);
                      setImageLoading(true);
                    }}
                    className={`w-full aspect-square overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-sm border ${selectedImage === index
                      ? "border-emerald-500 ring-2 ring-emerald-500/20 scale-105"
                      : "border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700"
                      } transition-all duration-300`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover object-center p-2"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://via.placeholder.com/300x200?text=No+Image";
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {product.name}
            </h1>

            <p className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              ${product.price}
            </p>

            <div className="mb-4">
              <h2 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                Description
              </h2>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                {product.description}
              </p>
            </div>

            {!inCart && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Quantity
                </h3>
                <div className="flex items-center w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-sm overflow-hidden p-1">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-medium text-gray-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleToggleCart}
                disabled={loading}
                className={`flex-1 py-3.5 rounded-full font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center ${inCart
                  ? "bg-gray-800 dark:bg-gray-700 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? "Processing..." : inCart ? "Remove from Cart" : "Add to Cart"}
              </button>

              <button
                onClick={() => {
                  if (!user) return toast.error("Please log in to purchase items.");
                  navigate("/checkout", { state: { buyNowProduct: product, buyNowQuantity: quantity } });
                }}
                className="flex-1 py-3.5 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white rounded-full font-medium shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.23)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center"
              >
                Buy Now
              </button>
            </div>

            {/* Product Info */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2 text-xs sm:text-sm">
              <div className="flex">
                <span className="w-24 font-medium text-gray-700 dark:text-gray-300">Category</span>
                <span className="text-gray-600 dark:text-gray-400">{product.category || "Electronics"}</span>
              </div>
              <div className="flex">
                <span className="w-24 font-medium text-gray-700 dark:text-gray-300">SKU</span>
                <span className="text-gray-600 dark:text-gray-400">{product._id.slice(-8).toUpperCase()}</span>
              </div>
              <div className="flex">
                <span className="w-24 font-medium text-gray-700 dark:text-gray-300">In Stock</span>
                <span className="text-gray-600 dark:text-gray-400">{product.stock > 0 ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-10 sm:mt-12 md:mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl dark:text-white lg:text-3xl font-medium">
              Related Products
            </h2>
            <button className="flex items-center text-emerald-600 gap-2">
              View All Products <MoveRightIcon className="hover:translate-x-1 transition duration-400" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard product={relatedProduct} key={relatedProduct._id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
