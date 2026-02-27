import React, { useState, useEffect } from "react";
import { useAppContext } from "../contexts/AppContext";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { User, Lock, Mail, Edit3, ShoppingBag, Package, Calendar, Truck } from "lucide-react";
import dayjs from "dayjs";

const Profile = () => {
    const { user, setUser, API_URL, token, logout } = useAppContext();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        phoneNumber: "",
        password: "",
    });

    useEffect(() => {
        if (!user && !localStorage.getItem("shopToken")) {
            navigate("/login");
        } else if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                address: user.address || "",
                phoneNumber: user.phoneNumber || "",
                password: ""
            });
        }
    }, [user, navigate]);

    useEffect(() => {
        if (!token) return;
        setLoadingOrders(true);
        axios
            .get(`${API_URL}/orders/myorders`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => setOrders(res.data.orders))
            .catch((err) => console.error(err))
            .finally(() => setLoadingOrders(false));
    }, [token, API_URL]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.put(`${API_URL}/profile/update`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (data.success) {
                setUser(data.user);
                toast.success("Profile updated successfully!");
                setIsEditing(false);
                setFormData({ ...formData, password: "" });
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <div className="min-h-screen py-20 text-center dark:text-white">Loading...</div>;

    const getStatusColor = (status) => {
        switch (status) {
            case "Processing": return "text-orange-600 bg-orange-100 dark:bg-orange-900/40 dark:text-orange-400";
            case "Shipped": return "text-blue-600 bg-blue-100 dark:bg-blue-900/40 dark:text-blue-400";
            case "Delivered": return "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/40 dark:text-emerald-400";
            case "Cancelled": return "text-red-600 bg-red-100 dark:bg-red-900/40 dark:text-red-400";
            default: return "text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-12 px-6 sm:px-12 lg:px-32 transition-colors duration-300">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Profile Section */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 sm:p-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 dark:bg-emerald-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>

                    <div className="flex justify-between items-center mb-8 relative z-10">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-400 bg-clip-text text-transparent flex items-center gap-3">
                            <User size={32} className="text-emerald-500" />
                            My Profile
                        </h2>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition"
                        >
                            <Edit3 size={18} />
                            {isEditing ? "Cancel" : "Edit Profile"}
                        </button>
                    </div>

                    {!isEditing ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
                            <div className="space-y-2">
                                <p className="Account text-sm text-gray-500 dark:text-gray-400 font-medium">Full Name</p>
                                <p className="text-xl text-gray-800 dark:text-white font-semibold">{user.name}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Email Address</p>
                                <p className="text-xl text-gray-800 dark:text-white font-semibold">{user.email}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Phone Number</p>
                                <p className="text-xl text-gray-800 dark:text-white font-semibold">{user.phoneNumber || "Not provided"}</p>
                            </div>
                            <div className="space-y-2 sm:col-span-2">
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Delivery Address</p>
                                <p className="text-xl text-gray-800 dark:text-white font-semibold">{user.address || "No address saved"}</p>
                            </div>
                            <div className="space-y-2 sm:col-span-2">
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Password</p>
                                <p className="text-xl text-gray-800 dark:text-white font-semibold flex items-center gap-2">
                                    ••••••••
                                </p>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <User size={16} /> Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <Mail size={16} /> Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <Edit3 size={16} /> Phone Number
                                </label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="Enter your phone number"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <Truck size={16} /> Delivery Address
                                </label>
                                <textarea
                                    name="address"
                                    placeholder="Enter your full delivery address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition min-h-[100px]"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <Lock size={16} /> New Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Leave blank to keep current password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition placeholder-gray-400"
                                />
                            </div>
                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-1 transition disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Order History Dynamic Section */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 sm:p-12 relative overflow-hidden group min-h-[400px]">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>

                    <div className="flex justify-between items-center mb-8 relative z-10 border-b border-gray-100 dark:border-gray-800 pb-6">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                            <ShoppingBag size={28} className="text-blue-500" />
                            Order History
                        </h2>
                    </div>

                    <div className="relative z-10 flex flex-col">
                        {loadingOrders ? (
                            <div className="py-12 flex justify-center text-gray-500 dark:text-gray-400">Loading your orders...</div>
                        ) : orders.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                                <div className="bg-white dark:bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center shadow-md mb-4">
                                    <ShoppingBag size={32} className="text-gray-400 dark:text-gray-500" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">No orders yet</h3>
                                <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">
                                    Looks like you haven't made any purchases yet. Start shopping to see your orders here.
                                </p>
                                <button
                                    onClick={() => navigate("/products")}
                                    className="bg-transparent border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 px-6 py-2 rounded-full font-medium hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition"
                                >
                                    Browse Products
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {orders.map((order) => (
                                    <div key={order._id} className="border border-gray-100 dark:border-gray-800 rounded-2xl p-6 hover:shadow-md transition-shadow bg-gray-50 dark:bg-gray-800/20">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                                            <div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
                                                    <Package size={14} /> Order #{order._id.substring(order._id.length - 8).toUpperCase()}
                                                </p>
                                                <p className="text-sm font-medium text-gray-800 dark:text-white flex items-center gap-2">
                                                    <Calendar size={14} /> {dayjs(order.createdAt).format("MMM DD, YYYY h:mm A")}
                                                </p>
                                            </div>
                                            <div className="flex flex-col items-start sm:items-end">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(order.orderStatus)}`}>
                                                    {order.orderStatus}
                                                </span>
                                                <p className="mt-2 text-lg font-bold text-gray-900 dark:text-white">${order.totalAmount.toFixed(2)}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-4">
                                                    {item.product ? (
                                                        <>
                                                            <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded-md shadow-sm bg-white" />
                                                            <div className="flex-1">
                                                                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-1">{item.product.name}</p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity} | Size: {item.size}</p>
                                                            </div>
                                                            <p className="text-sm font-medium text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                                                        </>
                                                    ) : (
                                                        <p className="text-sm text-gray-500 italic">Item no longer available</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-center pb-8">
                    <button
                        onClick={() => {
                            logout();
                            navigate("/");
                        }}
                        className="text-red-500 font-medium hover:text-red-600 transition underline underline-offset-4"
                    >
                        Sign out of your account
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Profile;
