const router = require('express').Router()
const { models: { Customer }} = require('../db')
module.exports = router

// GET /api/customers
// all customers page
router.get('/', async (req, res, next) => {
  try {
    const customers = await Customer.findAll({
      attributes: ['id', 'userId', 'firstName', 'lastName', 'address']
    })
    res.json(customers)
  } catch (err) {
    next(err)
  }
})

// PUT /api/customers/:id

router.put('/:id', async (req, res, next) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    res.send(await customer.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
    }))
  }
  catch (error) {
    next(error);
  }
});