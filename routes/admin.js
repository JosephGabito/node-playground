const express = require('express');
const path = require('path');
const router = express.Router();
const adminController = require('../controllers/admin');

// Add product endpoint.
router.get('/add-product', adminController.getAddProduct); // Add product form.
router.post('/add-product', adminController.postAddProduct);// Submit product.

// List admin products.
router.get('/products', adminController.getProducts);

// Edit product.
router.get('/products/edit/:id', adminController.getProductEdit);

// Edit product submission.
router.post('/admin/product/edit', adminController.updateProductEdit);

// Delete product.
router.get('/products/delete/:id', adminController.deleteProduct);

module.exports = router;