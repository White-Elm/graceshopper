'use strict'

const {db, models: {Admin, Cart, Customer, Invoice, Product, ProductType, Room, User}} = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating fake data for everyone
  const users = await Promise.all([
    User.create({ username: 'amata', password: '123' }),
    User.create({ username: 'jamie', password: '123' }),
    User.create({ username: 'patricia', password: '123' }),
    User.create({ username: 'stanie', password: '123' }),
    User.create({ username: 'hello', password: '123' }),
    User.create({ username: 'bingo', password: '123' }),
  ]);

  const admins = await Promise.all([
    Admin.create({ firstName: 'amata', lastName:'lee', password: '123' }),
    Admin.create({ firstName: 'jamie', lastName:'ha', password: '123' }),
  ]);

  const carts = await Promise.all([
    Cart.create({productName: 'ikea kitchen table', productQty: 9, cartTotal: 23.43, productTotal: 20 }),
    Cart.create({productName: 'ikea kitchen chair', productQty: 2, cartTotal: 50, productTotal: 2 }),
    Cart.create({productName: 'ikea bathroom table', productQty: 4, cartTotal: 12.32, productTotal: 19 }),
    Cart.create({productName: 'ikea bathroom chair', productQty: 1, cartTotal: 6.43, productTotal: 5 }),
    Cart.create({productName: 'ikea kitchen table', productQty: 6, cartTotal: 2, productTotal: 1 }),
  ]);

  const customers = await Promise.all([
    Customer.create({ firstName: 'Pat', lastName: 'Aguiar', address:'Brooklyn woohoo', username:'23df' }),
    Customer.create({ firstName: 'Stannie', lastName: 'Lim', address:'Staten Island', username:'23dafdf' }),
    Customer.create({ firstName: 'Hello', lastName: 'Goodbye', address:'s120395 aodifj drive', username:'jdfoijs' }),
    Customer.create({ firstName: 'Bingo', lastName: 'Dog', address:'14 Faith Drive', username:'asldgfjwe09' }),
  ]);

  const invoices = await Promise.all([
    Invoice.create({productName: 'ikea kitchen table', productQty: 9, invoiceTotal: 23.43, productTotal: 20 }),
    Invoice.create({productName: 'ikea kitchen chair', productQty: 2, invoiceTotal: 50, productTotal: 2 }),
    Invoice.create({productName: 'ikea bathroom table', productQty: 4, invoiceTotal: 12.32, productTotal: 19 }),
    Invoice.create({productName: 'ikea bathroom chair', productQty: 1, invoiceTotal: 6.43, productTotal: 5 }),
    Invoice.create({productName: 'ikea kitchen table', productQty: 6, invoiceTotal: 2, productTotal: 1 }),
  ]);

  const products = await Promise.all([
    Product.create({ name: 'kitchen table', description: 'it"s a table', quantity: 5, cost: 305.23, imageUrl:'data:image/jpeg;base64,/fakeimageurl'}),
    Product.create({ name: 'kitchen chair', description: 'it"s a chair', quantity: 2, cost: 13.53, imageUrl:'data:image/jpeg;base64,/fakeimageurl'}),
    Product.create({ name: 'bathroom table', description: 'it"s a table', quantity: 1, cost: 5.32, imageUrl: 'data:image/jpeg;base64,/fakeimageurl'}),
    Product.create({ name: 'bathroom chair', description: 'it"s a chair', quantity: 304, cost: 902.3, imageUrl:'data:image/jpeg;base64,/fakeimageurl'}),
  ]);

  const productTypes = await Promise.all([
    ProductType.create({ name:'chair' }),
    ProductType.create({ name:'table' }),
  ]);

  const rooms = await Promise.all([
    Room.create({ name:'bedroom' }),
    Room.create({ name:'kitchen' }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${admins.length} admins`);
  console.log(`seeded ${carts.length} carts`);
  console.log(`seeded ${customers.length} customers`);
  console.log(`seeded ${invoices.length} invoices`);
  console.log(`seeded ${products.length} products`);
  console.log(`seeded ${productTypes.length} productTypes`);
  console.log(`seeded ${rooms.length} rooms`);

  console.log(`seeded successfully`);

  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
};

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
