const Sequelize = require('sequelize');
const db = require('../db');

const Products = db.define('products',{
    name: {
        type: Sequelize.STRING
      },
    description:{
        type: Sequelize.STRING
    },
    category:{
        type:Sequelize.STRING
    },
    quantity:{
        type:Sequelize.INTEGER
    },
    cost:{
        type:Sequelize.INTEGER
    },
    roomId:{
        type:Sequelize.INTEGER
    },
    typeId:{
        type:Sequelize.INTEGER
    },
    imageUrl:{
        type:Sequelize.STRING
    },
});

module.exports = {Products};