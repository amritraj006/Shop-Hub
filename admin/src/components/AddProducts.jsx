import { useState } from "react";
import axios from "axios";
import {
  Package,
  DollarSign,
  Layers,
  PlusCircle,
  Image as ImageIcon,
  Type,
  AlignLeft,
  Save,
  CheckCircle2,
  AlertCircle,
  X,
  Plus,
  ArrowRight,
  TrendingUp,
  Box
} from "lucide-react";
import { toast } from "sonner";

const AddProducts = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    size: "",
    stock: "",
    image: "",
    image1: "",
    image2: "",
    image3: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imagePreviews, setImagePreviews] = useState({});

  const categories = [
    "Electronics",
    "Clothing",
    "Books",
    "Home & Garden",
    "Sports",
    "Toys",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSuccess(false);

    // Update image preview for image fields
    if (name.startsWith('image') && value && (value.startsWith('http') || value.startsWith('https'))) {
      setImagePreviews(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    if (!product.name || !product.price || !product.size || !product.stock || !product.category || !product.image) {
      toast.error("Please fill in all required fields including the main image.");
      return false;
    }
    if (product.price <= 0) {
      toast.error("Price must be greater than 0");
      return false;
    }
    if (product.stock < 0) {
      toast.error("Stock cannot be negative");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/api/admin/add-product", {
        name: product.name.trim(),
        description: product.description.trim(),
        price: Number(product.price),
        size: product.size.trim(),
        stock: Number(product.stock),
        image: product.image.trim(),
        secondaryImages: {
          image1: product.image1.trim(),
          image2: product.image2.trim(),
          image3: product.image3.trim(),
        },
        category: product.category,
      });

      if (res.data.success) {
        setSuccess(true);
        toast.success("Product added successfully! 🎉");
        setProduct({
          name: "",
          description: "",
          price: "",
          size: "",
          stock: "",
          image: "",
          image1: "",
          image2: "",
          image3: "",
          category: "",
        });
        setImagePreviews({});
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error adding product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Create Listing</h1>
          <p className="text-slate-500 font-medium mt-2 flex items-center gap-2">
            <PlusCircle size={16} className="text-emerald-500" />
            Populate your store with new premium inventory catalog.
          </p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inventory Status</span>
            <span className="text-sm font-bold text-slate-900">Catalogue Sync: Live</span>
          </div>
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <TrendingUp size={20} />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Form Details */}
        <div className="lg:col-span-8 space-y-10">
          {/* Information Section */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-10 space-y-8">
            <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center">
                <Type size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Product Particulars</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Primary Identity & Metadata</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Product Designation</label>
                <div className="relative">
                  <Box className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-slate-800 placeholder:text-slate-300"
                    placeholder="Enter product title..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Catalogue Classification</label>
                <div className="relative">
                  <Layers className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <select
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-slate-800 appearance-none cursor-pointer"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Product Narrative</label>
                <div className="relative">
                  <AlignLeft className="absolute left-5 top-6 text-slate-300" size={18} />
                  <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-slate-800 placeholder:text-slate-300 resize-none"
                    placeholder="Detailed product description and value proposition..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Logistics & Pricing Section */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-10 space-y-8">
            <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center">
                <DollarSign size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Commercials & Supply</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Financials & Inventory Depth</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Retail Valuation ($)</label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-black text-slate-800"
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Sizing Specification</label>
                <input
                  type="text"
                  name="size"
                  value={product.size}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-slate-800"
                  placeholder="e.g. Medium, Large"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Inventory Quantum</label>
                <input
                  type="number"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-black text-slate-800"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Imagery & Submit */}
        <div className="lg:col-span-4 space-y-10">
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 space-y-8 sticky top-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <ImageIcon size={20} />
              </div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight text-center">Visual Assets</h3>
            </div>

            <div className="space-y-6">
              {/* Main Image Control */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Primary Display Source</label>
                <div className="aspect-square w-full bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 overflow-hidden relative group">
                  {imagePreviews.image ? (
                    <img src={imagePreviews.image} alt="Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-300">
                      <ImageIcon size={40} strokeWidth={1} />
                      <p className="text-[10px] font-black uppercase tracking-widest mt-2">No Image Linked</p>
                    </div>
                  )}
                  <div className="absolute inset-x-4 bottom-4">
                    <input
                      type="text"
                      name="image"
                      value={product.image}
                      onChange={handleChange}
                      placeholder="Paste primary URL..."
                      className="w-full px-4 py-3 bg-white/90 backdrop-blur-md border border-slate-100 rounded-xl shadow-lg focus:ring-2 focus:ring-emerald-500 outline-none text-[11px] font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Secondary Images Rack */}
              <div className="grid grid-cols-3 gap-4">
                {['image1', 'image2', 'image3'].map((key) => (
                  <div key={key} className="space-y-2">
                    <div className="aspect-square bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden shadow-inner relative group">
                      {imagePreviews[key] ? (
                        <img src={imagePreviews[key]} alt="Thumb" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-slate-200">
                          <Plus size={16} />
                        </div>
                      )}
                      <input
                        type="text"
                        name={key}
                        value={product[key]}
                        onChange={handleChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        title="Paste secondary image URL"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] font-bold text-slate-300 text-center italic">Secondary assets are accessible via direct URL manifest integration.</p>
            </div>

            <div className="pt-4 space-y-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white p-6 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-50 group"
              >
                {loading ? (
                  <div className="w-6 h-6 border-4 border-slate-700 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Save size={18} />
                    Synchronize Listing
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {success && (
                <div className="flex items-center justify-center gap-2 text-emerald-600 bg-emerald-50 p-4 rounded-2xl border border-emerald-100 animate-in slide-in-from-top-2">
                  <CheckCircle2 size={16} />
                  <span className="text-[11px] font-black uppercase tracking-widest">Registry Updated Successfully</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;