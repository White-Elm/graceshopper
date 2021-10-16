const router = require('express').Router()
const { models: { Product }} = require('../db')
module.exports = router

// GET /api/products
// all products page
router.get('/', async (req, res, next) => {
  try {
    res.send(await Product.findAll());
  } catch (err) {
    next(err)
  }
})

// GET /api/products/:id
// single product page, selecting by product id
router.get('/:id', async (req, res, next) => {
  try {
    res.send(await Product.findByPk(req.params.id));
  }
  catch (error) {
    next(error);
  }
});

// GET /api/products/type
// filter products by type
router.get('/type', async (req, res, next) => {
  try {
    const product = await Product.findAll({
      where: {
        typeId: req.params.typeId
      }
    })
    res.send(product);
  }
  catch (error) {
    next(error);
  }
});

// GET /api/products/room
// filter products by room
router.get('/room', async (req, res, next) => {
  try {
    const product = await Product.findAll({
      where: {
        roomId: req.params.roomId
      }
    })
    res.send(product);
  }
  catch (error) {
    next(error);
  }
});

// ** APIs for Admin access only:

// POST /api/products
// handles -create new product
router.post('/', async (req, res, next) => {
  try {
    res.send(await Product.create(req.body));
  }
  catch (error) {
    next(error);
  }
});

// DELETE /api/products/:id
// handles -delete product
router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.send(product);
  }
  catch (error) {
    next(error);
  }
});

// PUT /api/products/:id
// handles -update/edit product
router.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(await product.update(req.body));
  }
  catch (error) {
    next(error);
  }
});