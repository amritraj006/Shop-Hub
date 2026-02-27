import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAppContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Show loading toast
        const loadingToast = toast.loading("Logging in...");

        try {
            const success = await login(email, password);

            if (success) {
                // Dismiss loading toast
                toast.dismiss(loadingToast);

                // Show success toast
                toast.success("Login successful! 🎉", {
                    duration: 4000,
                    position: "top-right",
                    style: {
                        background: "#10b981",
                        color: "#fff",
                        fontWeight: "500",
                    },
                    icon: "👋",
                });

                navigate("/");
            } else {
                // Dismiss loading toast
                toast.dismiss(loadingToast);

                // Show error toast
                toast.error("Invalid email or password", {
                    duration: 4000,
                    position: "top-right",
                    style: {
                        background: "#ef4444",
                        color: "#fff",
                        fontWeight: "500",
                    },
                });
            }
        } catch (error) {
            // Dismiss loading toast
            toast.dismiss(loadingToast);

            // Show error toast
            toast.error(error.message || "Login failed. Please try again.", {
                duration: 4000,
                position: "top-right",
                style: {
                    background: "#ef4444",
                    color: "#fff",
                    fontWeight: "500",
                },
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50 dark:bg-gray-900 px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden p-8 transition-colors duration-300">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h2>
                    <p className="text-gray-600 dark:text-gray-400">Login to access your cart and orders</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10 w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 dark:text-white outline-none transition-all"
                                placeholder="you@email.com"
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10 w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 dark:text-white outline-none transition-all"
                                placeholder="••••••••"
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Link
                            to="/forgot-password"
                            className="text-xs font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02]"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}