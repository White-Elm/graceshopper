const router = require('express').Router()
const { models: { Invoice }} = require('../db')
module.exports = router

// GET /api/invoice
// all invoices page
router.get('/', async (req, res, next) => {
  try {
    res.send(await Invoice.findAll());
  } catch (err) {
    next(err)
  }
})

// GET /api/invoice/customerId/:id
// invoice page per customer, selecting by customer id
router.get('/customerId/:id', async (req, res, next) => {
    try {
      console.log(Invoice);
      const invoice = await Invoice.findAll({
        where: {
          customerId: req.params.id
        }
      })
      res.send(invoice);
    }
    catch (error) {
      next(error);
    }
  });

// POST /api/invoice/customerId/:id
// add invoice after an order is complete
  router.post('/', async (req, res, next) => {
    try {
      const invoice = await Invoice.create(req.body);
      res.send(invoice);
   } catch (err) {
      next(err)
  }
});
