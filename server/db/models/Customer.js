const Sequelize = require('sequelize');
const db = require('../db');

const Customer = db.define('customer',{
    firstName: {
        type: Sequelize.STRING
      },
    lastName:{
        type: Sequelize.STRING
    },
    address:{
        type:Sequelize.STRING,
    }
});

module.exports = Customer;