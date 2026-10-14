const express = require('express');
const router = express.Router();
const c = require('../controllers/orderController');

router.get('/', c.getList);
router.get('/create', c.getCreate);
router.post('/create', c.postCreate);
router.get('/update/:id', c.getUpdate);
router.post('/update/:id', c.postUpdate);
router.get('/delete/:id', c.deleteOrder); // Dùng GET cho nút Delete để không cần cài thư viện method-override

module.exports = router;