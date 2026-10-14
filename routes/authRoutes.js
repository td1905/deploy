const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Trang hiển thị form login
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// Xử lý submit login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });

    // Tạo sẵn tài khoản admin mặc định nếu chưa tồn tại
    if (!user && username === 'admin' && password === '123456') {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({ username, password: hashedPassword, role: 'admin' });
    }

    if (user && await bcrypt.compare(password, user.password)) {
      req.session.user = user;
      return res.redirect('/orders');
    }

    return res.render('login', { error: 'Tên đăng nhập hoặc mật khẩu không đúng!' });
  } catch (err) {
    return res.render('login', { error: 'Lỗi máy chủ nội bộ!' });
  }
});

// Đăng xuất
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;