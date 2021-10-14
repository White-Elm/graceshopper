const Sequelize = require('sequelize');
const db = require('../db');

const Invoice = db.define('invoice',{
    customerId: {
        type: Sequelize.INTEGER
      },
    orderId:{
        type: Sequelize.INTEGER
    },
    productId:{
        type:Sequelize.INTEGER
    },
    productQuant:{
        type:Sequelize.INTEGER
    },
    invoiceTotal:{
        type:Sequelize.INTEGER
    },
    productTotal:{
        type:Sequelize.INTEGER
    },
});

module.exports = {Invoice}