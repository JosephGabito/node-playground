const express = require('express');
const shopController = require('../controllers/shop.js');
const { route } = require('./admin.js');

const router = express.Router();

router.get( '/', shopController.getIndex );

router.get( '/products', shopController.getProducts );

router.get( '/products/:slug', shopController.getProducDetails );

router.get( '/cart', shopController.getCart );

router.post( '/cart', shopController.postCart );

router.get( '/checkout', shopController.getCheckout );

router.get( '/orders', shopController.getOrders );

module.exports = router;