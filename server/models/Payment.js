const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  paymentMethod: { type: String, enum: ['Card', 'UPI', 'NetBanking', 'COD'], required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Success', 'Failed'], default: 'Pending' },
  amountPaid: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  transactionId: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
