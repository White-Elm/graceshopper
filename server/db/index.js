//this is the access point for all things database related!

const db = require('./db');

//calling in all our models
const Admin = require('./models/Admin');
const Cart = require('./models/Cart');
const Customer = require('./models/Customer');
const Invoice = require('./models/Invoice');
const Product = require('./models/Product');
const Room = require('./models/Room');
const ProductType = require('./models/ProductType');
const User = require('./models/User');


//associations could go here!

User.hasMany(Admin);
Admin.belongsTo(User);

Cart.belongsTo(Customer);
Customer.hasMany(Cart);

User.hasMany(Customer);
Customer.belongsTo(User);

Cart.belongsTo(Product);
Product.hasMany(Cart);
Invoice.belongsTo(Product);
Product.hasMany(Invoice);
Invoice.belongsTo(Customer);
Customer.hasMany(Invoice);

Product.belongsTo(ProductType);
ProductType.hasMany(Product);

Product.belongsTo(Room);
Room.hasMany(Product);


/*
const livingRoomTypes = ['Couch', 'Coffee Table', 'End Table', 'TV Stand', 'Love Seat', 'Rug', 'Lamp', 'Shelf']
const bedRoomTypes = ['Bed', 'Night Stand', 'Dresser', 'Desk', 'Chair', 'Lamp', 'Rug', 'Shelf', 'Wardrobe']
const kitchenTypes = ['Cabinets', 'Pots & Pans', 'Dishes', 'Appliances']
const diningRoomTypes = ['Dining Table', 'Dining Chair', 'Cabinets', 'Lamp']

If Product name includes word from livingRoomTypes arrary, roomID = id of living room from room table. 

If product name inlucdes word from productType table, set productTypeId = to the that items id : ex ID of Bed in ProductType Table = 1, set product's productTypeId = to 1..



*/

module.exports = {
  db,
  models: {
    Admin,
    Cart,
    Customer,
    Invoice,
    Product,
    ProductType,
    Room,
    User
  },
}
