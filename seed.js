const mongoose = require('mongoose');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');

mongoose.connect('mongodb://127.0.0.1:27017/shopDB').then(async () => {
  // Làm sạch dữ liệu cũ
  await Product.deleteMany({});
  await Order.deleteMany({});

  // 1. Thêm dữ liệu sản phẩm chuẩn theo đề bài
  await Product.create([
    {
      productName: "Wireless Mouse",
      category: "Electronics",
      stockStatus: "in_stock",
      unitPrice: 250000,
      tags: ["bestseller", "wireless", "accessory"]
    },
    {
      productName: "Mechanical Keyboard",
      category: "Electronics",
      stockStatus: "in_stock",
      unitPrice: 500000,
      tags: ["keyboard", "accessory"]
    }
  ]);

  // 2. Thêm đơn hàng mẫu
  await Order.create({
    customerName: "Nguyen Thi Lan",
    productName: "Wireless Mouse",
    quantity: 2,
    orderDate: new Date("2024-10-17"),
    totalPrice: 500000
  });

  console.log("--> Đã nạp dữ liệu mẫu vào shopDB thành công!");
  process.exit();
}).catch(err => {
  console.error("Lỗi:", err);
  process.exit(1);
});