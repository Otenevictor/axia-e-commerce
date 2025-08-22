const express = require('express');
const { createProduct, getAllProducts, updateProduct, deleteProduct } = require('../controllers/product.controller');
const { authentication, adminAuth }= require('../authMiddleware/auth.middleware');


const router = express.Router();

router.post('/product', authentication, adminAuth, createProduct);
router.get('/products', getAllProducts);
router.put('/product/:id', authentication, adminAuth, updateProduct);
router.delete('/product/:id', authentication, adminAuth, deleteProduct);

module.exports = router;
