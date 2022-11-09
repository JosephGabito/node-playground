const { rejects } = require('assert');
const fs = require('fs');
const path = require('path');

const storageFilePath = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json' 
);

const getProductsFromFile = () => {

    return new Promise( (resolve, reject) => {
        fs.readFile(
            storageFilePath,
            ( error, fileContent ) => {
                if ( error ) {
                    resolve( error );
                }
                resolve( fileContent.toString('utf-8') );
            }
        );
    });

}

class Product {

    constructor( title, imageUrl, description, price ) {
        this.id = Math.random().toString(16).slice(2);
        this.title = title;
        
        this.slug = title.toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-')
            + '__' + this.id;

        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    async save() {

        let products = [];
        
        let existingProducts = await getProductsFromFile();

        if ( typeof existingProducts === 'string' && existingProducts.length >=1 ) {
            products = JSON.parse( existingProducts );
        }

        products.push( this );

        fs.writeFile( storageFilePath, JSON.stringify( products ), ( err ) => {
            console.log( err );
        });

    }

    static fetchAll() {

        return new Promise( ( resolve, reject ) => {
            fs.readFile(storageFilePath, (err, fileContent) => {
                if ( err ) {
                    resolve( [] );
                } else {
                    if ( fileContent.length === undefined || fileContent.length === 0 ) {
                        resolve( [] );
                    } else {
                        resolve( JSON.parse( fileContent.toString('utf-8') ) );
                    }
                }
            })
        });

    }

    static findBySlug( slug ) {

        return new Promise( async ( resolve, reject ) => {
            const prods = await this.fetchAll();
            resolve( prods.find( p=> p.slug === slug ) );
        });
        
    }

}

module.exports = Product;