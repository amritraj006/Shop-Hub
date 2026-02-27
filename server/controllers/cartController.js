import express from 'express'
import User from '../models/User.js';

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const existingItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();

    // Return populated cart
    const updatedUser = await User.findById(userId).populate("cart.productId");

    res.json({
      cart: updatedUser.cart
        .filter((item) => item.productId) // Skip orphaned items
        .map((item) => ({
          _id: item._id,
          quantity: item.quantity,
          product: item.productId,
        })),
    });
  } catch (err) {
    console.error("Add to cart error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("cart.productId");
    // populates product details in the cart

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      cart: user.cart
        .filter((item) => item.productId) // Skip orphaned items
        .map((item) => ({
          _id: item._id,
          quantity: item.quantity,
          product: item.productId, // populated product details
        })),
    });
  } catch (err) {
    console.error("Error fetching cart:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

const toggleCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "Missing userId or productId" });
    }

    const user = await User.findById(userId).populate("cart.productId");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existing = user.cart.find(
      (item) => item.productId?._id?.toString() === productId || item.productId?.toString() === productId
    );

    if (existing) {
      // remove
      user.cart = user.cart.filter(
        (item) => (item.productId?._id?.toString() || item.productId?.toString()) !== productId
      );
      await user.save();
      return res.json({
        message: "Removed from cart",
        cart: user.cart.filter(i => i.productId),
        inCart: false,
      });
    } else {
      // add
      user.cart.push({ productId, quantity });
      await user.save();
      const updatedUser = await User.findById(userId).populate("cart.productId");
      return res.json({
        message: "Added to cart",
        cart: updatedUser.cart.filter(i => i.productId),
        inCart: true,
      });
    }
  } catch (err) {
    console.error("Error toggling cart:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

// ✅ Update quantity (with max 10)
const updateCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const cartItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );
    if (!cartItem)
      return res.status(404).json({ message: "Product not found in cart" });

    // enforce limit: between 1 and 10
    cartItem.quantity = Math.max(1, Math.min(10, quantity));

    await user.save();

    const updatedUser = await User.findById(userId).populate("cart.productId");

    res.json({
      cart: updatedUser.cart
        .filter((item) => item.productId)
        .map((item) => ({
          _id: item._id,
          quantity: item.quantity,
          product: item.productId,
        })),
    });
  } catch (err) {
    console.error("Update cart error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId
    );
    await user.save();

    // Return populated cart
    const updatedUser = await User.findById(userId).populate("cart.productId");

    res.json({
      cart: updatedUser.cart
        .filter((item) => item.productId)
        .map((item) => ({
          _id: item._id,
          quantity: item.quantity,
          product: item.productId,
        })),
    });
  } catch (err) {
    console.error("Remove cart error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addToCart, checkCartItems, toggleCart, updateCart, removeFromCart };