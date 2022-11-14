const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = async ( req, res, next ) => {
    Product.fetchAll().then(( products )=>{
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
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

exports.postCart = ( req, res, next ) => {

    const productId = req.body.productId;
    
    const prod = Product.findById( productId ).then( product => {
            Cart.addProduct( productId, parseFloat( product.price ) );
        } 
    ); 

    res.end();
    
}

exports.getCheckout = ( req, res, next ) => {

    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });

}

exports.getOrders = ( req, res, next ) => {

    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders'
    });

}

exports.getProducDetails = ( req, res, next ) => {
    
    const slug = req.params.slug;

    Product.findBySlug( slug ).then( ( product ) => {
        
        res.render('shop/product-details', {
            pageTitle: product.title,
            path: '/products',
            product: product
        });

    });

}