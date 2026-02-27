import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
    Plus,
    Search,
    Filter,
    Edit3,
    Trash2,
    Package,
    X,
    Save,
    MoreVertical,
    ChevronRight,
    TrendingUp,
    AlertCircle,
    DollarSign
} from "lucide-react";
import { Link } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editLoading, setEditLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/products");
            setProducts(res.data);
        } catch (err) {
            console.error("Error fetching products:", err);
            toast.error("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const res = await axios.delete(`http://localhost:3000/api/admin/products/${id}`);
                if (res.data.success) {
                    setProducts(products.filter(p => p._id !== id));
                    toast.success("Product deleted successfully");
                }
            } catch (err) {
                console.error("Error deleting product:", err);
                toast.error("Failed to delete product");
            }
        }
    };

    const handleEditClick = (product) => {
        setEditingProduct({ ...product });
        setIsEditModalOpen(true);
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        setEditLoading(true);
        try {
            const res = await axios.put(`http://localhost:3000/api/admin/products/${editingProduct._id}`, editingProduct);
            if (res.data.success) {
                setProducts(products.map(p => p._id === editingProduct._id ? res.data.product : p));
                setIsEditModalOpen(false);
                toast.success("Product updated successfully");
            }
        } catch (err) {
            console.error("Error updating product:", err);
            toast.error("Failed to update product");
        } finally {
            setEditLoading(false);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-emerald-600 animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-wrap justify-between items-end gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Products</h1>
                    <p className="text-slate-500 font-medium mt-1">Manage your inventory and product listings.</p>
                </div>
                <Link
                    to="/add-product"
                    className="bg-emerald-600 text-white px-8 py-4 rounded-[1.2rem] font-black text-sm flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                >
                    <Plus size={20} />
                    ADD NEW PRODUCT
                </Link>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                {/* Controls */}
                <div className="p-6 border-b border-slate-50 flex flex-wrap gap-4 items-center justify-between bg-slate-50/20">
                    <div className="relative flex-1 min-w-[320px]">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name, category, or ID..."
                            className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all text-sm font-medium"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-5 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-50 transition-colors font-bold text-sm">
                            <Filter size={18} className="text-slate-400" />
                            Categorize
                        </button>
                        <div className="w-[1px] h-12 bg-slate-200 mx-2"></div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest self-center">
                            Total: <span className="text-emerald-600">{products.length} Items</span>
                        </p>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-[0.2em]">
                                <th className="px-8 py-4">Item Details</th>
                                <th className="px-8 py-4">Status</th>
                                <th className="px-8 py-4">Category</th>
                                <th className="px-8 py-4">Inventory</th>
                                <th className="px-8 py-4">Unit Price</th>
                                <th className="px-8 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredProducts.map((product) => (
                                <tr key={product._id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-slate-50 overflow-hidden border border-slate-100 shadow-sm group-hover:scale-105 transition-transform">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800 leading-snug">{product.name}</p>
                                                <p className="text-[10px] font-mono text-slate-400 mt-1 uppercase">ID: {product._id.slice(-8)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${product.stock > 10 ? 'text-emerald-500' : product.stock > 0 ? 'text-orange-500' : 'text-red-500'}`}>
                                            <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500 animate-pulse' : product.stock > 0 ? 'bg-orange-500' : 'bg-red-500'}`}></div>
                                            {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-tighter">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-bold text-slate-700">{product.stock} Units</p>
                                        <div className="w-20 h-1 bg-slate-100 rounded-full mt-2 overflow-hidden">
                                            <div className={`h-full rounded-full ${product.stock > 50 ? 'bg-emerald-500' : 'bg-orange-500'}`} style={{ width: `${Math.min(product.stock, 100)}%` }}></div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 font-black text-slate-900">${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                            <button
                                                onClick={() => handleEditClick(product)}
                                                className="p-3 text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm"
                                                title="Edit Item"
                                            >
                                                <Edit3 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="p-3 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm"
                                                title="Remove Item"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredProducts.length === 0 && (
                    <div className="p-20 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300 mb-4">
                            <Package size={40} />
                        </div>
                        <p className="text-slate-500 font-bold">No products found matching your search.</p>
                    </div>
                )}
            </div>

            {/* Modern Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
                        {/* Modal Header */}
                        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-emerald-600">
                                    <Edit3 size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-800">Edit Product</h3>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Modified at {new Date().toLocaleTimeString()}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-800 hover:shadow-md transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateProduct} className="p-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {/* Left Column: Image Preview */}
                                <div className="lg:col-span-1 space-y-6">
                                    <div className="aspect-square rounded-[2rem] overflow-hidden border border-slate-200 bg-slate-50 group relative">
                                        <img src={editingProduct.image} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <p className="text-white text-[10px] font-black uppercase tracking-widest">Image Preview</p>
                                        </div>
                                    </div>
                                    <div className="bg-emerald-50 rounded-2xl p-4 flex gap-3 border border-emerald-100">
                                        <AlertCircle size={20} className="text-emerald-600 flex-shrink-0" />
                                        <p className="text-[10px] font-bold text-emerald-800 leading-relaxed">
                                            Updating the image URL will instantly reflect in the preview box above. Ensure you use high-quality direct links.
                                        </p>
                                    </div>
                                </div>

                                {/* Middle/Right Columns: Form Fields */}
                                <div className="md:col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 content-start">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Product Name</label>
                                        <input
                                            type="text"
                                            value={editingProduct.name}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-slate-800"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Category</label>
                                        <input
                                            type="text"
                                            value={editingProduct.category}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-slate-800"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Pricing ($)</label>
                                        <div className="relative">
                                            <DollarSign size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="number"
                                                value={editingProduct.price}
                                                onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                                                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-slate-800"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Stock Units</label>
                                        <input
                                            type="number"
                                            value={editingProduct.stock}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-slate-800"
                                        />
                                    </div>
                                    <div className="col-span-1 md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Thumbnail Source URL</label>
                                        <input
                                            type="text"
                                            value={editingProduct.image}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-slate-800"
                                        />
                                    </div>
                                    <div className="col-span-1 md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Brief Description</label>
                                        <textarea
                                            value={editingProduct.description}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                            rows={3}
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-slate-800 resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 flex justify-end gap-4 border-t border-slate-50 pt-8">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-8 py-4 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-slate-600 transition-colors"
                                >
                                    Discard Changes
                                </button>
                                <button
                                    type="submit"
                                    disabled={editLoading}
                                    className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-50"
                                >
                                    {editLoading ? "SAVING..." : <><Save size={16} /> COMMIT UPDATES</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
