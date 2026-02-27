import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Users,
    ShoppingBag,
    DollarSign,
    Package,
    TrendingUp,
    Clock,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/admin/stats");
                if (res.data.success) {
                    setData(res.data);
                }
            } catch (err) {
                console.error("Error fetching stats:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="relative">
                    <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-emerald-600 animate-spin"></div>
                </div>
            </div>
        );
    }

    const stats = [
        {
            name: "Total Revenue",
            value: `$${data?.stats.totalSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            icon: DollarSign,
            color: "text-blue-600",
            bg: "bg-blue-50",
            trend: "+12.5%",
            isUp: true
        },
        {
            name: "Total Orders",
            value: data?.stats.totalOrders,
            icon: ShoppingBag,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            trend: "+8.2%",
            isUp: true
        },
        {
            name: "Total Products",
            value: data?.stats.totalProducts,
            icon: Package,
            color: "text-orange-600",
            bg: "bg-orange-50",
            trend: "Stable",
            isUp: true
        },
        {
            name: "Total Users",
            value: data?.stats.totalUsers,
            icon: Users,
            color: "text-purple-600",
            bg: "bg-purple-50",
            trend: "+5.1%",
            isUp: true
        },
    ];

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Overview</h1>
                    <p className="text-slate-500 font-medium mt-1">Real-time store performance & analytics.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                        Download Report
                    </button>
                    <button className="px-4 py-2 bg-emerald-600 rounded-xl text-sm font-bold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all">
                        Refresh Data
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`${stat.bg} p-3 rounded-2xl group-hover:scale-110 transition-transform`}>
                                <stat.icon className={stat.color} size={24} />
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full ${stat.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                {stat.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {stat.trend}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.name}</p>
                            <h3 className="text-2xl font-black text-slate-800 mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts / Table Section */}
            <div className="grid grid-cols-1 gap-8">
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-emerald-600">
                                <Clock size={20} />
                            </div>
                            <h2 className="text-xl font-black text-slate-800">Recent Transactions</h2>
                        </div>
                        <Link to="/orders" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 underline-offset-4 hover:underline">
                            View All Orders
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-[0.2em]">
                                    <th className="px-8 py-4">Transaction</th>
                                    <th className="px-8 py-4">Customer</th>
                                    <th className="px-8 py-4">Amount</th>
                                    <th className="px-8 py-4">Status</th>
                                    <th className="px-8 py-4 text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {data?.recentOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-5">
                                            <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-emerald-600 transition-colors">
                                                #{order._id.slice(-8).toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs uppercase">
                                                    {order.user?.name?.charAt(0) || "?"}
                                                </div>
                                                <span className="text-sm font-bold text-slate-700">{order.user?.name || "Anonymous User"}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-sm font-black text-slate-900">${order.totalAmount.toFixed(2)}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider shadow-sm border ${order.orderStatus === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                    order.orderStatus === 'Processing' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                        order.orderStatus === 'Shipped' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                                            'bg-red-50 text-red-600 border-red-100'
                                                }`}>
                                                {order.orderStatus}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <span className="text-xs font-bold text-slate-400">
                                                {new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-6 bg-slate-50/30 border-t border-slate-50 flex justify-center">
                        <Link to="/orders" className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2">
                            Showing 5 most recent transactions <ArrowUpRight size={14} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
