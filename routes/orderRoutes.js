const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Phải import đủ 2 hàm bảo vệ
const { isAuthenticated, isAdmin } = require('../middlewares/auth');

// Trang danh sách: Bất kỳ ai đăng nhập (user/admin) đều xem được
router.get('/', isAuthenticated, orderController.getAllOrders);

// Chức năng Tạo đơn: Ai cũng tạo được
router.post('/create', isAuthenticated, orderController.createOrder);

// 🔒 Chức năng XÓA: Gắn "isAdmin" vào giữa để chặn user thường
router.post('/delete/:id', isAuthenticated, isAdmin, orderController.deleteOrder);

module.exports = router;