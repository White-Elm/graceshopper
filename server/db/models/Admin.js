const Sequelize = require('sequelize');
const db = require('../db');

const Admin = db.define('admin',{
    firstName: {
        type: Sequelize.STRING
      },
    lastName:{
        type: Sequelize.STRING
    },
    username:{
        type:Sequelize.STRING,
        unique: true,
        allowNull: false
    }
});

module.exports = {Admin};