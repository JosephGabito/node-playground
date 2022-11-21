const getDb = require('../util/database.js').getDb;
const mongodb = require('mongodb');
class Product {

    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save() {
        const db = getDb();
        return db.collection('products').insertOne(this)
    }

    static fetchAll() {
        const db = getDb();
        return db
            .collection('products')
            .find()
            .toArray();
    }

    static findById(id) {
        const db = getDb();
        return db
            .collection('products')
            .findOne({ _id: mongodb.ObjectId(id) }, {});
    }

    static updateById(id, newProperties) {
        const db = getDb();

        return db
            .collection('products').updateOne(
                { _id: mongodb.ObjectId(id) },
                { $set: newProperties }
            )
    }

    static deleteById(id) {
        const db = getDb();

        return db
            .collection('products')
            .deleteOne({ _id: mongodb.ObjectId(id) })
    }

}

module.exports = Product;