import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    ShoppingBag,
    PackagePlus,
    Package,
    LogOut,
    ChevronRight,
    Menu,
    X,
    Bell,
    Search,
    User
} from "lucide-react";

const AdminLayout = ({ children }) => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const menuItems = [
        { name: "Dashboard", path: "/", icon: LayoutDashboard },
        { name: "Orders", path: "/orders", icon: ShoppingBag },
        { name: "Products", path: "/products", icon: Package },
        { name: "Add Product", path: "/add-product", icon: PackagePlus },
    ];

    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 bg-white border-r border-slate-200 transition-all duration-300 z-30 ${isSidebarOpen ? "w-64" : "w-20"}`}>
                <div className="flex flex-col h-full">
                    {/* Logo Section */}
                    <div className="h-16 flex items-center px-6 border-b border-slate-100">
                        <Link to="/" className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
                            <div className="flex-shrink-0 w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-200">
                                SH
                            </div>
                            {isSidebarOpen && (
                                <span className="text-lg font-bold text-slate-800 tracking-tight">ShopHub <span className="text-emerald-600">Admin</span></span>
                            )}
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 mt-6 px-4 space-y-2 overflow-y-auto">
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${isActive
                                            ? "bg-emerald-50 text-emerald-600 shadow-sm"
                                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                                        }`}
                                >
                                    <Icon size={20} className={isActive ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-600"} />
                                    {isSidebarOpen && <span className="font-semibold text-sm">{item.name}</span>}
                                    {isActive && isSidebarOpen && (
                                        <div className="absolute right-0 w-1 h-6 bg-emerald-600 rounded-l-full" />
                                    )}
                                    {!isSidebarOpen && (
                                        <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                            {item.name}
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Bottom Logout */}
                    <div className="p-4 border-t border-slate-100">
                        <button
                            className="flex items-center gap-3 px-4 py-3 w-full text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 overflow-hidden whitespace-nowrap"
                        >
                            <LogOut size={20} className="flex-shrink-0" />
                            {isSidebarOpen && <span className="font-semibold text-sm">Logout Session</span>}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            {isSidebarOpen ? <Menu size={20} /> : <X size={20} />}
                        </button>
                        <div className="hidden md:flex items-center bg-slate-100 rounded-xl px-3 py-1.5 gap-2 border border-slate-200">
                            <Search size={16} className="text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent border-none outline-none text-sm text-slate-600 w-48 focus:w-64 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
                        <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 pl-3 rounded-xl transition-colors">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-800 leading-tight">Admin User</p>
                                <p className="text-[10px] text-slate-500 font-medium">System Manager</p>
                            </div>
                            <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 border border-slate-200 overflow-hidden">
                                <User size={18} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="p-8 pb-20">
                    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
