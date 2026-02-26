import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
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
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
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
    },
  },
  { timestamps: true }
);

// decrease stock method
productSchema.methods.decreaseStock = async function (quantity) {
  if (this.stock < quantity) throw new Error("Not enough stock available");
  this.stock -= quantity;
  await this.save();
};

const Product = mongoose.model("Product", productSchema);
export default Product;
