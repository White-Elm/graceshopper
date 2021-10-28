const router = require('express').Router()
const { models: {User }} = require('../db')
const { models: {Customer , Cart }} = require('../db')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body)}); 
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      customers:{
        id : req.body.id,
      },
      carts:{
        customerId: req.body.id,
      },
    },
    {
      include:[
        {model:Customer},
        {model: Cart}
      ]
    }
 );
  res.send({token: await user.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
})

router.get('/')