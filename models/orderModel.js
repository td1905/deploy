const mongoose = require('mongoose');

module.exports = mongoose.model('Order', new mongoose.Schema({
  customerName: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  orderDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true }
}));