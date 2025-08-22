const express = require('express');
const { addToCart, getCart } = require('../controllers/cart.controller');
const { authentication }= require('../authMiddleware/auth.middleware');

const router = express.Router();

router.post('/cart/add', authentication, addToCart);
router.get('/cart', authentication, getCart);

module.exports = router;
