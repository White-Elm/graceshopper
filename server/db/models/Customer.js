const Sequelize = require('sequelize');
const db = require('../db');

const Customer = db.define('customer',{
    firstName: {
        type: Sequelize.STRING
      },
    lastName:{
        type: Sequelize.STRING
    },
    username:{
        type:Sequelize.STRING,
        unique:true,
        allowNull: false
    },
    address:{
        type:Sequelize.STRING,
        allowNull: false
    }
});

module.exports = {Customer};