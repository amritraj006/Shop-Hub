import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Payment from "../models/Payment.js";

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const allOrders = await Order.find();

    const totalSales = allOrders.reduce((acc, order) => acc + order.totalAmount, 0);
    const totalOrders = allOrders.length;

    // Recent transactions (last 5)
    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      stats: {
        totalProducts,
        totalUsers,
        totalSales,
        totalOrders
      },
      recentOrders
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email address phoneNumber')
      .populate('items.product', 'name image price')
      .sort({ createdAt: -1 });

    // Merge payment details if they exist separately
    const ordersWithPayment = await Promise.all(orders.map(async (order) => {
      const payment = await Payment.findOne({ order: order._id });
      return {
        ...order.toObject(),
        paymentInfo: payment || null
      };
    }));

    res.json({ success: true, orders: ordersWithPayment });
  } catch (error) {
    console.error("Get All Orders Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.orderStatus = req.body.status || order.orderStatus;
      if (req.body.status === 'Delivered') {
        order.deliveredAt = Date.now();
      }
      const updatedOrder = await order.save();
      res.json({ success: true, order: updatedOrder });
    } else {
      res.status(404).json({ success: false, message: "Order not found" });
    }
  } catch (error) {
    console.error("Update Order Status Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Update product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, size, stock, image, secondaryImages, category } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price !== undefined ? price : product.price;
      product.size = size || product.size;
      product.stock = stock !== undefined ? stock : product.stock;
      product.image = image || product.image;
      product.secondaryImages = secondaryImages || product.secondaryImages;
      product.category = category || product.category;

      const updatedProduct = await product.save();
      res.json({ success: true, product: updatedProduct });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    console.error("Update Product Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Delete product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ success: true, message: "Product removed" });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    console.error("Delete Product Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Add product
// @route   POST /api/admin/add-product
// @access  Private/Admin
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
    console.error("Add Product Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};