const Sequelize = require('sequelize');
const db = require('../db');

const Admin = db.define('admin',{
    firstName: {
        type: Sequelize.STRING
      },
    lastName:{
        type: Sequelize.STRING
    }
});

module.exports = Admin;