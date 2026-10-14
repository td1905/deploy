const Order = require('../models/orderModel');
const Product = require('../models/productModel');

// 1. Xem danh sách đơn hàng
exports.getList = async (req, res) => {
  const orders = await Order.find();
  res.render('order', { orders });
};

// 2. Mở trang tạo mới
exports.getCreate = (req, res) => {
  res.render('createOrder', { err: null });
};

// 3. Xử lý tạo mới
exports.postCreate = async (req, res) => {
  const { customerName, productName, quantity, orderDate } = req.body;

  // Tìm sản phẩm (không phân biệt chữ hoa/thường)
  const prod = await Product.findOne({
    productName: { $regex: new RegExp(`^${productName.trim()}$`, 'i') }
  });

  // Nếu không tồn tại -> báo lỗi
  if (!prod) {
    return res.render('createOrder', { err: 'Product does not exist in system!' });
  }

  // Tự động tính tổng tiền theo đơn giá từ DB
  const totalPrice = Number(quantity) * prod.unitPrice;

  await Order.create({
    customerName: customerName.trim(),
    productName: prod.productName,
    quantity: Number(quantity),
    orderDate,
    totalPrice
  });

  res.redirect('/orders');
};

// 4. Mở trang cập nhật
exports.getUpdate = async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.render('updateOrder', { order, err: null });
};

// 5. Xử lý cập nhật
exports.postUpdate = async (req, res) => {
  const { customerName, productName, quantity, orderDate } = req.body;

  const prod = await Product.findOne({
    productName: { $regex: new RegExp(`^${productName.trim()}$`, 'i') }
  });

  if (!prod) {
    const order = await Order.findById(req.params.id);
    return res.render('updateOrder', { order, err: 'Product does not exist in system!' });
  }

  const totalPrice = Number(quantity) * prod.unitPrice;

  await Order.findByIdAndUpdate(req.params.id, {
    customerName: customerName.trim(),
    productName: prod.productName,
    quantity: Number(quantity),
    orderDate,
    totalPrice
  });

  res.redirect('/orders');
};

// 6. Xóa đơn hàng
exports.deleteOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.redirect('/orders');
};