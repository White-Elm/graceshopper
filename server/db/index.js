//this is the access point for all things database related!

const db = require('./db');

//calling in all our models
const Admin = require('./models/Admin');
const Cart = require('./models/Cart');
const Customer = require('./models/Customer');
const Invoice = require('./models/Invoice');
const Product = require('./models/Product');
const Room = require('./models/Room');
const User = require('./models/User');


//associations could go here!

Admin.belongsTo(User);
User.hasMany(Admin);

Cart.belongsTo(Customer);
Customer.hasOne(Cart);

Customer.belongsTo(User);
User.hasMany(Customer);

Invoice.belongsTo(Customer);
Invoice.hasOne(Customer);

Product.belongsTo(Cart);
Cart.hasMany(Product);
Product.belongsTo(Invoice);
Invoice.hasMany(Product);

ProductType.belongsTo(Product);
ProductType.hasMany(Product);

Room.belongsTo(Product);
Room.hasMany(Product);

module.exports = {
  db,
  models: {
    Admin,
    Cart,
    Customer,
    Invoice,
    Product,
    Room,
    User
  },
}
