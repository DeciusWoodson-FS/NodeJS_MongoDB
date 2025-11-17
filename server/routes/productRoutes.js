const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /api/products
router.get('/', productController.getAllProducts);

// POST /api/products
router.post('/', productController.createProduct);

// GET /api/products/:id
router.get('/:id', productController.getProductById);

// PUT /api/products/:id
router.put('/:id', productController.updateProduct);

// DELETE /api/products/:id
router.delete('/:id', productController.deleteProduct);

module.exports = router;