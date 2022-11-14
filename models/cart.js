const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname( process.mainModule.filename ),
    'data',
    'cart.json'
);
module.exports = class Cart {
    
    static addProduct( productId, productPrice )  {

        // Fetch previous cart.
        fs.readFile(p, ( err, fileContent )=>{

            let cart = {
                products: [],
                totalPrice: 0
            }
            
            if ( ! err ) {
                cart = JSON.parse(fileContent.toString('utf-8'));
            }

            const existingProductIndex = cart.products.findIndex( prod=> prod.id = productId);
            
            const existingProduct = cart.products[existingProductIndex];

            let updatedProduct;
            
            
            if ( existingProduct ) {
                
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;

            } else {

                updatedProduct = {
                    id: productId,
                    qty: 1
                }

                cart.products.push( updatedProduct );

            }

            cart.totalPrice = cart.totalPrice + productPrice;

            fs.writeFile( p, JSON.stringify(cart),  ( err ) => {
                
            })

        });
        // Analyze. Find existing product. Add or increase the qty.

    }
}