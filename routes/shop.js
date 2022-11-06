const express = require('express');
const shopController = require('../controllers/shop.js');
const { route } = require('./admin.js');

const router = express.Router();

router.get( '/', shopController.getIndex );

router.get( '/products', shopController.getProducts );

router.get( '/cart', shopController.getCart );

router.get( '/checkout', shopController.getCheckout );

module.exports = router;