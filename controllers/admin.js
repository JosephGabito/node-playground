const Product = require('../models/product');

exports.getAddProduct = ( req, res, next ) => {
    res.render('admin/add-product', {
        pageTitle: 'Add product',
        path: '/admin/add-product'
    });
};

exports.postAddProduct = ( req,res,next) => {

    const title = req.body.title;
    const slug = title.toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
        + '__';

    Product.create({
        title: title,
        slug: slug,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        price: req.body.price
    }).then(result => {
        console.log('Product created');
        res.redirect('/');
    }).catch((error) => {
        console.log(error);
    });

};


exports.getProducts = ( req, res, next ) => {

    Product.findAll().then((products)=>{
        res.render('admin/products', {
            pageTitle: 'Admin Products',
            path: '/admin/products',
            prods: products,
        });
    });
    
}