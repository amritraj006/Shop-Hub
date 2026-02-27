import Product from "../models/Product.js";

// Add Product
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      size,
      stock,
      image,
      secondaryImages,
      category,
    } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      size,
      stock,
      image,
      secondaryImages,
      category,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};