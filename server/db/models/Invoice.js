const Sequelize = require('sequelize');
const db = require('../db');

const Invoice = db.define('invoice',{
    productName:{
        type:Sequelize.STRING
    },
    productQty:{
        type:Sequelize.DECIMAL
    },
    productTotal:{
        type:Sequelize.DECIMAL
    },
    invoiceTotal:{
        type:Sequelize.DECIMAL
    },
});

module.exports = Invoice;