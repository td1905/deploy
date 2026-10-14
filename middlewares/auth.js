// Yêu cầu đã đăng nhập
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  return res.redirect('/login');
};

// Phân quyền: Bắt buộc tài khoản phải là Admin
const isAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    return next(); // Nếu là admin thì cho đi tiếp
  }
  // Nếu là user thường, ném ra lỗi hoặc chuyển hướng
  return res.status(403).send('<h2>LỖI 403: Bạn không có quyền Admin để thực hiện chức năng này!</h2><a href="/orders">Quay lại</a>');
};

// Đừng quên export cả 2 hàm ra nhé
module.exports = { isAuthenticated, isAdmin };