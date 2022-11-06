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

    constructor( t ) {
        this.title = t;
    }

    async save() {

        let products = await getProductsFromFile();
        
        products = JSON.parse( products );

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

}

module.exports = Product;