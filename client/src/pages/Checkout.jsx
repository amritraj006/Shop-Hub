import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { toast } from "sonner";
import axios from "axios";
import { Truck, ShieldCheck, CheckCircle } from "lucide-react";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ orderTotal, handleFinalizeOrder }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);
        toast.loading("Processing payment securely...", { id: "payment" });

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });

        if (error) {
            console.error("Payment failed:", error);
            toast.error(error.message || "Payment Failed", { id: "payment" });
            setLoading(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            await handleFinalizeOrder(paymentIntent.id);
            setLoading(false);
        } else {
            toast.error("An unexpected event occurred.", { id: "payment" });
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button
                type="submit"
                disabled={!stripe || loading}
                className="mt-8 w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-1 transition duration-300 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
                {loading ? (
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                    <>
                        <CheckCircle size={20} />
                        Pay ${orderTotal.toFixed(2)} Securely
                    </>
                )}
            </button>
        </form>
    );
};

const Checkout = () => {
    const { user, isLoaded, API_URL, token, setCartCount, triggerCartUpdate } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();

    // Determine if we are bypassing the cart (Buy Now)
    const buyNowProduct = location.state?.buyNowProduct;
    const initialBuyNowQty = location.state?.buyNowQuantity || 1;

    const [cartItems, setCartItems] = useState([]);
    const [calculating, setCalculating] = useState(true);
    const [clientSecret, setClientSecret] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    // Initial redirect if not logged in
    useEffect(() => {
        if (isLoaded && !user) {
            navigate("/login");
        } else if (user) {
            setAddress(user.address || "");
            setPhoneNumber(user.phoneNumber || "");
        }
    }, [user, isLoaded, navigate]);

    // Fetch Cart Details or Extract Buy Now State
    useEffect(() => {
        if (!user) return;

        let initialItems = [];
        let itemsForIntent = [];

        if (buyNowProduct) {
            itemsForIntent = [{
                productId: buyNowProduct._id,
                quantity: initialBuyNowQty
            }];
            setCartItems([{
                product: buyNowProduct,
                quantity: initialBuyNowQty
            }]);
            initialItems = [{
                product: buyNowProduct,
                quantity: initialBuyNowQty
            }];
        } else {
            // Normal mode: Fetch from DB Cart
            axios
                .get(`${API_URL}/cart/${user._id}`)
                .then((res) => {
                    setCartItems(res.data.cart || []);
                    if (res.data.cart?.length === 0) {
                        toast.info("Your cart is empty!");
                        navigate("/products");
                    }
                })
                .catch((err) => {
                    console.error("Cart fetch failed:", err);
                    toast.error("Failed to load checkout details.");
                });
        }
    }, [user, API_URL, navigate, buyNowProduct, initialBuyNowQty]);

    useEffect(() => {
        if (!cartItems || cartItems.length === 0) return;

        const fetchIntent = async () => {
            try {
                const payload = {};
                if (buyNowProduct) {
                    payload.buyNowItem = {
                        productId: buyNowProduct._id,
                        quantity: cartItems[0].quantity
                    };
                }

                const { data } = await axios.post(
                    `${API_URL}/orders/create-payment-intent`,
                    payload,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (data.success) {
                    setClientSecret(data.clientSecret);
                }
            } catch (err) {
                console.error("Failed to fetch intent:", err);
                toast.error("Failed to initialize payment gateway.");
            } finally {
                setCalculating(false);
            }
        };

        if (buyNowProduct || cartItems.length > 0) {
            fetchIntent();
        }
    }, [cartItems, API_URL, token, buyNowProduct]);

    // Handle Quantity adjustments inside checkout if explicitly Buy Now mode
    const updateBuyNowQuantity = (change) => {
        if (!buyNowProduct) return;
        setCartItems(prev => prev.map(item => {
            const newQty = item.quantity + change;
            if (newQty >= 1 && newQty <= 10) {
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const subTotal = cartItems.reduce(
        (acc, item) =>
            acc + (item.product?.price || item.productId?.price || 0) * item.quantity,
        0
    );

    // Dummy Shipping Math
    const shipping = subTotal > 150 ? 0 : 15;
    const tax = subTotal * 0.05; // 5% dummy tax
    const orderTotal = subTotal + shipping + tax;

    const handleFinalizeOrder = async (transactionId) => {
        // Sync Address and Phone Number to DB if they've changed
        try {
            if (address !== user.address || phoneNumber !== user.phoneNumber) {
                await axios.put(`${API_URL}/profile/update`, { address, phoneNumber }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
        } catch (syncErr) {
            console.error("Profile sync failed during checkout:", syncErr);
            // Optionally notify user but don't block order
        }

        const payload = {
            paymentMethod: "Card",
            paymentStatus: "Success",
            transactionId
        };

        if (buyNowProduct) {
            payload.buyNowItem = {
                productId: buyNowProduct._id,
                quantity: cartItems[0].quantity
            };
        }

        try {
            const { data } = await axios.post(
                `${API_URL}/orders`,
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (data.success) {
                toast.success("Payment Successful! Order Confirmed 🎉", {
                    id: "payment",
                    duration: 4000
                });

                // Only reset cart count visually if we actually checked out cart items
                if (!buyNowProduct) {
                    setCartCount(0);
                    triggerCartUpdate();
                }

                // Redirect to profile to see the order
                navigate("/profile");
            }
        } catch (error) {
            console.error("Order Error:", error);
            toast.error(error.response?.data?.message || "Order Finalization Failed", { id: "payment" });
        }
    };

    const options = {
        clientSecret,
        appearance: {
            theme: 'stripe',
        },
    };

    if (calculating || !clientSecret) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black text-gray-700 dark:text-white">
                Loading Checkout & Securing Environment...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* Left Side: Checkout Form & Payment */}
                <div className="lg:col-span-7 space-y-8">

                    <div className="bg-white dark:bg-gray-900 shadow-xl rounded-3xl p-8 relative overflow-hidden group">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                            <Truck className="text-emerald-500" />
                            Delivery Details
                        </h2>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase px-1">First Name</label>
                                    <input type="text" defaultValue={user?.name?.split(" ")[0]} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-800 dark:text-gray-200" disabled />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase px-1">Last Name</label>
                                    <input type="text" defaultValue={user?.name?.split(" ")[1] || ""} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-800 dark:text-gray-200" disabled />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase px-1">Email Address</label>
                                    <input type="email" defaultValue={user?.email} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-800 dark:text-gray-200" disabled />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase px-1 focus-within:text-emerald-500 transition-colors">Phone Number</label>
                                    <input
                                        type="text"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="Enter phone number"
                                        className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-gray-800 dark:text-gray-200 transition-all shadow-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase px-1 focus-within:text-emerald-500 transition-colors">Delivery Address</label>
                                <textarea
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Enter your full delivery address"
                                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none min-h-[100px] text-gray-800 dark:text-gray-200 transition-all shadow-sm"
                                />
                                <p className="text-[10px] text-gray-400 mt-1 px-1 italic">Updating this will also save it to your profile for next time.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 shadow-xl rounded-3xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 dark:bg-emerald-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3 relative z-10">
                            <ShieldCheck className="text-emerald-500" />
                            Payment Information
                        </h2>

                        <div className="relative z-10 mb-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 rounded-2xl flex items-start gap-3">
                            <ShieldCheck className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
                            <p className="text-sm text-emerald-800 dark:text-emerald-300">
                                This is a secure 256-bit encrypted payment gateway powered by Stripe.
                            </p>
                        </div>

                        {clientSecret && (
                            <Elements options={options} stripe={stripePromise}>
                                <CheckoutForm orderTotal={orderTotal} handleFinalizeOrder={handleFinalizeOrder} />
                            </Elements>
                        )}
                    </div>

                </div>

                {/* Right Side: Order Summary */}
                <div className="lg:col-span-5">
                    <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border border-gray-100 dark:border-gray-800 shadow-xl rounded-3xl p-8 sticky top-24">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h3>

                        <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            {cartItems.map((item) => {
                                const p = item.product || item.productId;
                                if (!p) return null; // Defensive check for orphaned items
                                return (
                                    <div key={p._id} className="flex items-center gap-4">
                                        <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-lg shadow-sm" />
                                        <div className="flex-1">
                                            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">{p.name}</h4>
                                            {buyNowProduct ? (
                                                <div className="flex items-center gap-3 mt-2">
                                                    <div className="flex items-center w-24 border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden bg-white dark:bg-gray-800">
                                                        <button
                                                            onClick={() => updateBuyNowQuantity(-1)}
                                                            disabled={item.quantity <= 1}
                                                            className="flex-1 py-0.5 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="flex-1 text-center py-0.5 text-xs font-medium text-gray-900 dark:text-white border-x border-gray-200 dark:border-gray-700">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateBuyNowQuantity(1)}
                                                            disabled={item.quantity >= 10}
                                                            className="flex-1 py-0.5 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                                            )}
                                        </div>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                                            ${(p.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 space-y-3">
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                <span>Subtotal ({totalItems} items)</span>
                                <span className="font-medium text-gray-900 dark:text-gray-100">${subTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                <span>Shipping</span>
                                <span className="font-medium text-emerald-600 dark:text-emerald-400">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                <span>Estimated Tax (5%)</span>
                                <span className="font-medium text-gray-900 dark:text-gray-100">${tax.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-800 mt-6 pt-6">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-400 bg-clip-text text-transparent">
                                    ${orderTotal.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Checkout;
