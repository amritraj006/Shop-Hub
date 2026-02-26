import { useState } from "react";
import axios from "axios";
import "./AdminAddProducts.css"; // We'll create this CSS file

const AdminAddProducts = () => {
  const [product, setProduct] = useState({
    productId: "",
    title: "",
    price: "",
    category: "",
    mainImage: "",
    detailImages: ["", "", ""],
    description: "",
    availableSizes: [
      { size: "S", stock: 7 },
      { size: "M", stock: 7 },
      { size: "L", stock: 7 },
      { size: "XL", stock: 7 },
    ],
    colors: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...product.availableSizes];
    newSizes[index][field] = field === "stock" ? Number(value) : value;
    setProduct({ ...product, availableSizes: newSizes });
  };

  const handleDetailImageChange = (index, value) => {
    const newImages = [...product.detailImages];
    newImages[index] = value;
    setProduct({ ...product, detailImages: newImages });
  };

  const handleColorsChange = (e) => {
    const allowedColors = ["Red", "Blue", "Green", "Black", "White", "Yellow", "Gray"];
    
    const parsed = e.target.value
      .split(",")
      .map(c => c.replace(/["']/g, "").trim())
      .map(c => c.charAt(0).toUpperCase() + c.slice(1).toLowerCase())
      .filter(c => allowedColors.includes(c))
      .slice(0, 4);
    
    setProduct({ ...product, colors: parsed });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    
    try {
      const res = await axios.post("/api/products", product);
      console.log("Product added:", res.data);
      setSubmitMessage("Product added successfully!");
      // Reset form after successful submission
      setProduct({
        productId: "",
        title: "",
        price: "",
        category: "",
        mainImage: "",
        detailImages: ["", "", ""],
        description: "",
        availableSizes: [
          { size: "S", stock: 7 },
          { size: "M", stock: 7 },
          { size: "L", stock: 7 },
          { size: "XL", stock: 7 },
        ],
        colors: [],
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      setSubmitMessage("Error adding product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="product-form-container">
      <h2 className="form-title">Add New Product</h2>
      
      {submitMessage && (
        <div className={`submit-message ${submitMessage.includes("Error") ? "error" : "success"}`}>
          {submitMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-section">
          <h3 className="section-title">Basic Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="productId">Product ID</label>
              <input
                id="productId"
                name="productId"
                value={product.productId}
                placeholder="e.g., PROD-001"
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="title">Product Title</label>
              <input
                id="title"
                name="title"
                value={product.title}
                placeholder="Enter product title"
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="price">Price ($)</label>
              <input
                id="price"
                name="price"
                type="number"
                value={product.price}
                placeholder="0.00"
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                id="category"
                name="category"
                value={product.category}
                placeholder="e.g., Clothing, Electronics"
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h3 className="section-title">Images</h3>
          <div className="form-group">
            <label htmlFor="mainImage">Main Image URL</label>
            <input
              id="mainImage"
              name="mainImage"
              value={product.mainImage}
              placeholder="https://example.com/image.jpg"
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="detail-images">
            <label>Detail Images (Optional)</label>
            {product.detailImages.map((img, i) => (
              <input
                key={i}
                value={img}
                placeholder={`Detail Image ${i + 1} URL`}
                onChange={(e) => handleDetailImageChange(i, e.target.value)}
                className="detail-image-input"
              />
            ))}
          </div>
        </div>
        
        <div className="form-section">
          <h3 className="section-title">Description</h3>
          <div className="form-group">
            <label htmlFor="description">Product Description</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              placeholder="Enter detailed product description..."
              onChange={handleChange}
              rows="4"
              required
            />
          </div>
        </div>
        
        <div className="form-section">
          <h3 className="section-title">Inventory</h3>
          <div className="inventory-grid">
            <div className="sizes-section">
              <h4>Available Sizes & Stock</h4>
              {product.availableSizes.map((s, i) => (
                <div key={i} className="size-input-group">
                  <div className="size-input">
                    <label>Size</label>
                    <input
                      value={s.size}
                      onChange={(e) => handleSizeChange(i, "size", e.target.value)}
                    />
                  </div>
                  <div className="stock-input">
                    <label>Stock</label>
                    <input
                      type="number"
                      value={s.stock}
                      onChange={(e) => handleSizeChange(i, "stock", e.target.value)}
                      min="0"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="colors-section">
              <h4>Colors</h4>
              <div className="form-group">
                <label htmlFor="colors">Enter colors (comma-separated)</label>
                <input
                  id="colors"
                  placeholder="e.g., Red, Blue, Green"
                  onChange={handleColorsChange}
                />
                <div className="color-hint">
                  Allowed: Red, Blue, Green, Black, White, Yellow, Gray
                </div>
                {product.colors.length > 0 && (
                  <div className="selected-colors">
                    Selected: {product.colors.join(", ")}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AdminAddProducts;