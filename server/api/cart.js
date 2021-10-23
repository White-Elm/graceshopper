const router = require('express').Router()
const { models: { Cart }} = require('../db')
module.exports = router

// GET /api/cart
// all carts page
router.get('/', async (req, res, next) => {
  try {
    res.send(await Cart.findAll());
  } catch (err) {
    next(err)
  }
})

// GET /api/cart/customerId/:id
// cart page per customer, selecting by customer id
router.get('/customerId/:id', async (req, res, next) => {
    try {
      const cart = await Cart.findAll({
        where: {
          customerId: req.params.id
        }
      })
      res.send(cart);
    }
    catch (error) {
      next(error);
    }
  });


// GET /api/cart/cartTotal/:id
// cart total per customer, this is for the checkout page
router.get('/cartTotal/:id', async (req, res, next) => {
  try {
    console.log(Cart);
    const cart = await Cart.findAll({
      where: {
        customerId: req.params.id
      }
    })
    res.send(cart);
  }
  catch (error) {
    next(error);
  }
});

// POST /api/cart
// handles -create new cart item (includes product to cart)
router.post('/', async (req, res, next) => {
  try {
    res.send(await Cart.create({
      customerId: req.body.customerId,
      productName: req.body.productName,
      productQty: req.body.productQty,
    }));
  }
  catch (error) {
    next(error);
  }
});

// DELETE /api/cart/:id
// handles -delete product from cart
router.delete('/:id', async (req, res, next) => {
    try {
      const product = await Cart.findByPk(req.params.id);
      await product.destroy();
      res.send(product);
    }
    catch (error) {
      next(error);
    }
  });

// // PUT /api/cart/:id
// // handles -update/edit product quantity in cart
// router.put('/:id', async (req, res, next) => {
//     try {
//       const product = await Cart.findByPk(req.params.id);
//       res.send(await product.update(req.body));
//     }
//     catch (error) {
//       next(error);
//     }
//   });


// // GET /api/cart/:id/checkout
// // cart checkout page, selecting by cart id
// router.get('/:id/checkout', async (req, res, next) => {
//     try {
//       res.send(await Cart.findByPk(req.params.id));
//     }
//     catch (error) {
//       next(error);
//     }
//   });

// // should probably be moved to /api/orderId
// // GET /api/cart/:id/orderId
// // cart checkout page, selecting by cart id
// router.get('/:id/orderId', async (req, res, next) => {
//     try {
//       res.send(await Cart.findByPk(req.params.id));
//     }
//     catch (error) {
//       next(error);
//     }
//   });