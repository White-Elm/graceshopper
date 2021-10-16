const Sequelize = require('sequelize');
const db = require('../db');

const Products = db.define('products',{
    name: {
        type: Sequelize.STRING
      },
    description:{
        type: Sequelize.STRING
    },
    quantity:{
        type:Sequelize.INTEGER
    },
    cost:{
        type:Sequelize.DECIMAL
    },
    imageUrl:{
        type:Sequelize.STRING(1000000)
    },
});

module.exports = Products;