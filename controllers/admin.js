const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add product',
        path: '/admin/add-product'
    });
};

exports.postAddProduct = (req, res, next) => {

    const title = req.body.title;

    const slug = title.toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
        + '__';

    const product = new Product(
        title,
        req.body.price,
        req.body.description,
        req.body.imageUrl
    );

    product.save().then(
        response => {
            res.redirect('/');
        })
        .catch(
            err => {
                console.log(err)
            }
        );

};


exports.getProducts = (req, res, next) => {

    Product.fetchAll().then((products) => {
        res.render('admin/products', {
            pageTitle: 'Admin Products',
            path: '/admin/products',
            prods: products,
        });
    });

}

exports.getProductEdit = (req, res, next) => {

    Product.findById(req.params.id).then((product) => {
        res.render('admin/edit-product', {
            pageTitle: 'Editing: ' + product.title,
            path: '/admin/products/edit',
            product: product
        });
    }).catch(() => {
        res.render('404', {
            pageTitle: 'Error 404 product not found',
            path: '/404',
        });
    });

}

exports.updateProductEdit = (req, res, next) => {

    const _id = req.body.id;

    Product.updateById(_id, req.body)
        .then((response) => {
            res.redirect('/products/edit/' + _id);
        })
        .catch(err => {
            console.log(err);
        });

}

exports.deleteProduct = (req, res, next) => {

    const _id = req.params.id;

    Product.deleteById(_id)
        .then((product) => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err)
        });

}