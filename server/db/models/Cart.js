const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart',{
    productId: {
        type: Sequelize.INTEGER
      },
    customerId:{
        type: Sequelize.INTEGER
    },
    cartTotal:{
        type:Sequelize.INTEGER,
    }
});

module.exports = {Cart};