const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const { isAuthenticated } = require('./middlewares/auth');
const Product = require('./models/productModel');

const app = express();

app.use(express.urlencoded({ extended: true }));

// Cấu hình đường dẫn thư mục views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Cấu hình session
app.use(session({
  secret: 'duong_shop_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

// Kết nối Database linh hoạt giữa Local và Cloud
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shopDB';
mongoose.connect(mongoURI)
  .then(async () => {
    console.log('MongoDB Connected');
    if (await Product.countDocuments() === 0) {
      await Product.create([
        { productName: "Wireless Mouse", category: "Electronics", stockStatus: "in_stock", unitPrice: 250000, tags: ["bestseller"] },
        { productName: "Mechanical Keyboard", category: "Electronics", stockStatus: "in_stock", unitPrice: 500000, tags: ["accessory"] }
      ]);
    }
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Routes công khai
app.use('/', authRoutes);

// Route bảo vệ: Bắt buộc login trước khi vào /orders
app.use('/orders', isAuthenticated, orderRoutes);

// Điều hướng trang chủ
app.get('/', (req, res) => {
  res.redirect('/orders');
});

// CHỐT HẠ CHO RENDER: Mở cổng và bind vào 0.0.0.0
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});