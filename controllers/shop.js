const db = require('../util/database');
const products = require('../models/product');

exports.getProducts = (req, res, next) => {
    products.fetchAll().then((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    });
};

exports.getIndex = (req, res, next) => {
    products.fetchAll().then((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Home',
            path: '/'
        });
    });
}

exports.getProducDetails = (req, res, next) => {

    const id = req.params.id;

    products.findById(id).then(product => {
        res.render('shop/product-details', {
            pageTitle: product.title,
            path: '/products',
            product: product
        });
    });

}


/**
exports.getCart = (req, res, next) => {

    res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart'
    });

}

exports.postCart = (req, res, next) => {

    const productId = req.body.productId;

    const prod = Product.findById(productId).then(product => {
        Cart.addProduct(productId, parseFloat(product.price));
    }
    );

    res.end();

}

exports.getCheckout = (req, res, next) => {

    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });

}

exports.getOrders = (req, res, next) => {

    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders'
    });

}



*/