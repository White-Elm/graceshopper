const router = require('express').Router()
const { models: { Customer }} = require('../db')
module.exports = router

// GET /api/customers
// all customers page
router.get('/', async (req, res, next) => {
  try {
    const customers = await Customer.findAll({
      attributes: ['id', 'userId']
    })
    res.json(customers)
  } catch (err) {
    next(err)
  }
})