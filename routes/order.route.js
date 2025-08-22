const express = require('express');
const { placeOrder, updateOrderStatus } = require('../controllers/order.controller');
const { authentication, adminAuth }= require('../authMiddleware/auth.middleware');

const router = express.Router();

router.post('/orders', authentication, placeOrder);
router.put('/order/:id', authentication, adminAuth, updateOrderStatus);

module.exports = router;
