import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      size: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true } // price at the time of purchase
    }
  ],
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
  orderStatus: {
    type: String,
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Processing'
  },
  paymentMethod: { type: String, enum: ['COD', 'Card', 'UPI', 'NetBanking'], default: 'Card' },
  createdAt: { type: Date, default: Date.now },
  deliveredAt: { type: Date }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
