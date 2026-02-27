import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
    ShoppingBag,
    User,
    MapPin,
    CreditCard,
    Package,
    Clock,
    ChevronDown,
    Phone,
    Mail,
    Truck,
    CheckCircle2,
    Calendar,
    Hash
} from "lucide-react";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/admin/orders");
            if (res.data.success) {
                setOrders(res.data.orders);
            }
        } catch (err) {
            console.error("Error fetching orders:", err);
            toast.error("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (orderId, status) => {
        setUpdating(orderId);
        try {
            const res = await axios.put(`http://localhost:3000/api/admin/orders/${orderId}/status`, { status });
            if (res.data.success) {
                setOrders(orders.map(o => o._id === orderId ? { ...o, orderStatus: status } : o));
                toast.success(`Order #${orderId.slice(-6)} status: ${status}`);
            }
        } catch (err) {
            console.error("Error updating status:", err);
            toast.error("Failed to update order status");
        } finally {
            setUpdating(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-emerald-600 animate-spin"></div>
            </div>
        );
    }

    const statuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Orders</h1>
                    <p className="text-slate-500 font-medium mt-1">Manage and track customer fulfillment.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-10 pb-20">
                {orders.length === 0 ? (
                    <div className="bg-white p-24 rounded-[3rem] shadow-sm border border-slate-100 text-center">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300 mb-6">
                            <ShoppingBag size={48} />
                        </div>
                        <h3 className="text-xl font-black text-slate-800">No Orders Synchronized</h3>
                        <p className="text-slate-400 font-medium mt-2 max-w-md mx-auto">When customers place orders, they will appear here for processing and status tracking.</p>
                    </div>
                ) : (
                    orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-100/50 transition-all group">
                            {/* Header Bar */}
                            <div className="bg-slate-50/50 p-6 px-10 border-b border-slate-50 flex flex-wrap justify-between items-center gap-6">
                                <div className="flex items-center gap-6">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Order Identifier</span>
                                        <div className="flex items-center gap-2">
                                            <Hash size={14} className="text-emerald-600" />
                                            <span className="text-lg font-black text-slate-900 tracking-tight">#{order._id.slice(-8).toUpperCase()}</span>
                                        </div>
                                    </div>
                                    <div className="w-[1px] h-10 bg-slate-200"></div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Placement Date</span>
                                        <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                                            <Calendar size={14} />
                                            {new Date(order.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] shadow-sm border ${order.orderStatus === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                            order.orderStatus === 'Processing' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                order.orderStatus === 'Shipped' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                                    'bg-red-50 text-red-600 border-red-100'
                                        }`}>
                                        {order.orderStatus}
                                    </span>

                                    <div className="relative group/menu">
                                        <button
                                            className="bg-white border border-slate-200 p-2.5 rounded-xl text-slate-600 hover:border-emerald-500 hover:text-emerald-600 transition-all flex items-center gap-2"
                                            disabled={updating === order._id}
                                        >
                                            <span className="text-[10px] font-black uppercase tracking-widest pl-2">Status</span>
                                            <ChevronDown size={14} />
                                        </button>
                                        <div className="absolute right-0 top-full mt-2 bg-white border border-slate-100 rounded-[1.2rem] shadow-2xl z-20 hidden group-hover/menu:block min-w-[180px] overflow-hidden p-2">
                                            <p className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">Set New Status</p>
                                            {statuses.map(status => (
                                                <button
                                                    key={status}
                                                    onClick={() => handleUpdateStatus(order._id, status)}
                                                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
                                                >
                                                    {status}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Body */}
                            <div className="p-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
                                {/* Items Section */}
                                <div className="lg:col-span-7 space-y-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                            <Package size={14} className="text-emerald-500" />
                                            Purchased Manifest
                                        </h4>
                                        <span className="text-[10px] font-bold text-slate-300 bg-slate-50 px-2 py-0.5 rounded-md">{order.items.length} Items</span>
                                    </div>

                                    <div className="space-y-4">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-5 p-4 bg-slate-50/20 rounded-[1.5rem] border border-slate-50 hover:border-slate-100 transition-all hover:bg-slate-50/50">
                                                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden flex-shrink-0">
                                                    <img src={item.product?.image} alt={item.product?.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-slate-800 leading-tight truncate">{item.product?.name}</p>
                                                    <div className="flex items-center gap-3 mt-1.5">
                                                        <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-md text-[9px] font-black text-slate-500">QTY: {item.quantity}</span>
                                                        <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-md text-[9px] font-black text-slate-500">SIZE: {item.size}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-black text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                                                    <p className="text-[9px] font-bold text-emerald-600 mt-1">@ ${item.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-slate-100 flex justify-between items-center">
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Financial Summary</p>
                                            <div className="flex items-baseline gap-1 mt-1">
                                                <span className="text-xs font-bold text-slate-400">$</span>
                                                <span className="text-4xl font-black text-slate-900 tracking-tighter">{order.totalAmount.toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${order.paymentStatus === 'Paid' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200 border-none' : 'bg-red-500 text-white shadow-lg shadow-red-200'}`}>
                                                {order.paymentStatus === 'Paid' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                                                {order.paymentStatus}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Vertical Divider */}
                                <div className="hidden lg:block w-[1px] bg-slate-100 h-full col-span-1 mx-auto"></div>

                                {/* Logistics & Registry Section */}
                                <div className="lg:col-span-4 space-y-10">
                                    {/* Customer Block */}
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                            <User size={14} className="text-emerald-500" />
                                            Customer Identity
                                        </h4>
                                        <div className="p-5 bg-slate-50/50 rounded-[1.5rem] border border-slate-50 space-y-3">
                                            <p className="font-black text-slate-800 text-lg leading-none">{order.user?.name || "Anonymous Requester"}</p>
                                            <div className="space-y-2 pt-1 border-t border-slate-100 mt-2">
                                                <p className="text-sm font-bold text-slate-500 flex items-center gap-2">
                                                    <Mail size={14} className="text-slate-300" />
                                                    {order.user?.email}
                                                </p>
                                                <p className="text-sm font-bold text-slate-500 flex items-center gap-2">
                                                    <Phone size={14} className="text-slate-300" />
                                                    {order.user?.phoneNumber || "+00 (Not Provided)"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Shipment Block */}
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                            <Truck size={14} className="text-emerald-500" />
                                            Logistics Registry
                                        </h4>
                                        <div className="p-5 bg-slate-50/50 rounded-[1.5rem] border border-slate-50 flex gap-3 shadow-inner">
                                            <MapPin size={18} className="text-emerald-500 flex-shrink-0 mt-1" />
                                            <p className="text-sm font-bold text-slate-600 leading-relaxed italic">
                                                {order.user?.address || "No designated delivery address registered for this account manifest."}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Payment Details */}
                                    {order.paymentInfo && (
                                        <div className="space-y-4">
                                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                                <CreditCard size={14} className="text-emerald-500" />
                                                Gateway Manifest
                                            </h4>
                                            <div className="p-5 bg-white border border-slate-200 rounded-[1.5rem] shadow-sm space-y-2">
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-slate-400 font-bold">Standard</span>
                                                    <span className="bg-slate-100 px-3 py-1 rounded-lg font-black text-slate-700 text-[10px] uppercase">
                                                        {order.paymentInfo.paymentMethod}
                                                    </span>
                                                </div>
                                                <div className="pt-2 border-t border-slate-50">
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Authorization Code</p>
                                                    <p className="font-mono text-[10px] text-emerald-600 font-black break-all bg-emerald-50/50 p-2 rounded-lg border border-emerald-100 leading-tight">
                                                        {order.paymentInfo.transactionId || "VOID_OR_PENDING"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Orders;
