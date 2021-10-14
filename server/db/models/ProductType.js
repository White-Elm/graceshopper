const Sequelize = require('sequelize');
const db = require('../db');

const ProductType = db.define('productType',{
    name: {
        type: Sequelize.STRING
      }
});

module.exports = {ProductType};