const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const connectionString = 'mongodb+srv://${ENV_USER}:${ENV_PASSWORD}@cluster0.owfqmec.mongodb.net/?retryWrites=true&w=majority';
//const connectionString = 'mongodb://localhost:27017';

let _db;

const MongoConnect = callback => {
    MongoClient.connect(connectionString)
        .then(client => {
            _db = client.db('shop');
            console.log('Connected');
            callback(client);
        })
        .catch(err => {
            console.log(err)
        });
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found';
}

exports.mongoConnect = MongoConnect;
exports.getDb = getDb;