const router = require('express').Router()
const { models: { Cart }} = require('../db')
module.exports = router

// GET /api/cart/:id
// cart page, selecting by cart id
router.get('/:id', async (req, res, next) => {
    try {
      res.send(await Cart.findByPk(req.params.id));
    }
    catch (error) {
      next(error);
    }
  });

// DELETE /api/cart/:id/productId
// handles -delete product from cart
router.delete('/:id/productId', async (req, res, next) => {
    try {
      // this API needs to be updated - depends on how the DB is set
      const product = await Cart.findByPk(req.params.id);
      await product.destroy();
      res.send(product);
    }
    catch (error) {
      next(error);
    }
  });

// PUT /api/cart/:id/productId
// handles -update/edit product quantity in cart
router.put('/:id/productId', async (req, res, next) => {
    try {
      // this API needs to be updated - depends on how the DB is set
      const product = await Cart.findByPk(req.params.id);
      res.send(await product.update(req.body));
    }
    catch (error) {
      next(error);
    }
  });

// GET /api/cart/:id/checkout
// cart checkout page, selecting by cart id
router.get('/:id/checkout', async (req, res, next) => {
    try {
      res.send(await Cart.findByPk(req.params.id));
    }
    catch (error) {
      next(error);
    }
  });

// should probably be moved to /api/orderId
// GET /api/cart/:id/orderId
// cart checkout page, selecting by cart id
router.get('/:id/orderId', async (req, res, next) => {
    try {
      res.send(await Cart.findByPk(req.params.id));
    }
    catch (error) {
      next(error);
    }
  });