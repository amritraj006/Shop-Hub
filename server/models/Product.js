const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: true, // since it's single size, keep it required
    },
    stock: {
      type: Number,
      required: true,
      default: 0, // starts with 0, admin can update
      min: 0,     // stock should not go below 0
    },
    image: {
      type: String,
      required: true,
    },
    secondaryImages: {
      image1: String,
      image2: String,
      image3: String,
    },
    category: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

// method to decrease stock when purchase happens
productSchema.methods.decreaseStock = async function (quantity) {
  if (this.stock < quantity) {
    throw new Error("Not enough stock available");
  }
  this.stock -= quantity;
  await this.save();
};

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
