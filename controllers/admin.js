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

exports.getProductEdit = ( req, res, next ) => {

    console.log( req.params.id );

    Product.findAll(
        {
            where: {id: req.params.id}
        }
    ).then((products)=>{
        res.render('admin/edit-product', {
            pageTitle: 'Editing: ' + products[0].dataValues.title,
            path: '/admin/products/edit',
            product: products[0].dataValues,
        });
    }).catch(()=>{
        res.render('404', {
            pageTitle: 'Product not found',
            path: '/404',
        });
    });
}

exports.updateProductEdit = ( req, res, next ) => {

    const _id = req.body.id;

    Product.findOne({ where: { id: _id } })
        .then( ( product ) => {

            if (product) {
                product.update( req.body )
                .then(function ( result ) {
                    res.redirect( '/admin/products/edit' + _id );
                })
            }
           
        });

}

exports.deleteProduct = ( req, res, next ) => {
    
    const _id = req.params.id;

    Product.findOne({ where: { id: _id } })
        .then( ( product ) => {

            if (product) {
                product.destroy().then(()=>{
                    res.redirect( '/admin/products' );
                });
            }
        
        });

}

