const router = require('express').Router()
const { models: { Admin }} = require('../db')
const { models: { Product }} = require('../db')
const { models: { Customer }} = require('../db')
module.exports = router

// ** APIs for Admin access only:
// GET /api/admins
// all admins page
router.get('/', async (req, res, next) => {
    try {
      const admins = await Admin.findAll({
        attributes: ['firstName']
      })
      res.json(admins)
    } catch (err) {
      next(err)
    }
  })

// ***** IMPORTANT: review following routes with Sign In & Authentication tickets *****
// GET /api/admins/:id
// single logged admin page, selecting by admin id
router.get('/:id', async (req, res, next) => {
  try {
    res.send(await Admin.findByPk(req.params.id));
  }
  catch (error) {
    next(error);
  }
});

// ** Admin can update products database:
// GET /api/admins/products
// all products page
router.get('/:id/products', async (req, res, next) => {
  try {
    res.send(await Product.findAll());
  } catch (err) {
    next(err)
  }
})

// POST /api/admins/products
// handles -create new product
router.post('/:id/products', async (req, res, next) => {
    try {
      res.send(await Product.create(req.body));
    }
    catch (error) {
      next(error);
    }
});
  
// DELETE /api/admins/products/:id
// handles -delete product
router.delete('/:id/products/:id', async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id);
      await product.destroy();
      res.send(product);
    }
    catch (error) {
      next(error);
    }
});
  
// PUT /api/admins/products/:id
// handles -update/edit product
router.put('/:id/products/:id', async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id);
      res.send(await product.update(req.body));
    }
    catch (error) {
      next(error);
    }
});

// ** Admin can update customers database:
// GET /api/admins/customers
// all customers page
router.get('/:id/customers', async (req, res, next) => {
  try {
    res.send(await Customer.findAll());
  } catch (err) {
    next(err)
  }
})

// POST /api/admins/customers
// handles -create new customer
router.post('/:id/customers', async (req, res, next) => {
    try {
      res.send(await Customer.create(req.body));
    }
    catch (error) {
      next(error);
    }
});
  
// DELETE /api/admins/customers/:id
// handles -delete customer
router.delete('/:id/customers/:id', async (req, res, next) => {
    try {
      const customer = await Customer.findByPk(req.params.id);
      await customer.destroy();
      res.send(customer);
    }
    catch (error) {
      next(error);
    }
});
  
// PUT /api/admins/customers/:id
// handles -update/edit customer
router.put('/:id/customers/:id', async (req, res, next) => {
    try {
      const customer = await Customer.findByPk(req.params.id);
      res.send(await customer.update(req.body));
    }
    catch (error) {
      next(error);
    }
});