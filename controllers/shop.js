const Product = require('../models/product');

exports.getProducts = async ( req, res, next ) => {
    Product.fetchAll().then(( products )=>{
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/'
        });
    })
};

exports.getIndex = ( req, res, next) => {
    
    Product.fetchAll().then(( products )=>{
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    })

}

exports.getCart = ( req, res, next ) => {

    res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart'
    });
    
}

exports.getCheckout = ( req, res, next ) => {

    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/cart'
    });

}