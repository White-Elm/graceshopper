const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart',{
    productName:{
        type:Sequelize.STRING
    },
    productQty:{
        type:Sequelize.DECIMAL
    },
    productTotal:{
        type:Sequelize.DECIMAL
    },
    cartTotal:{
        type:Sequelize.DECIMAL
    },
});

module.exports = Cart;