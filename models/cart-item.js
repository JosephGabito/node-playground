const Sequelized = require('sequelize');
const sequelize = require('../util/database');

const CartItem = sequelize.define('cartItem', {
    id: {
        type: Sequelized.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    qty: {
        type: Sequelized.INTEGER,
        allowNull: false,
    }
});

module.exports = CartItem;