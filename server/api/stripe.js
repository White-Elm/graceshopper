const express = require('express');
const app = express();
const path = require('path');
//const stripe = require('stripe')('insert secret key');
const domain = 'http://localhost:8080'

//static files
app.use(express.static(path.join(_dirname,"views")));

//middleware
app.use(express.json());

//routes
app.post("/payment", async(req,res) => {
  const {product} = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data:{
          currency: "usd",
          product_data:{
            name: product.name,
            images: [product.image]
          },
          unit_amount: product.amount * 100,
        },
        quantity: product.quantity,
      }
    ],
    mode: "payment",
    success_url: `${domain}/success`,
    cancel_url: `${domain}/cancel`
  })
  res.json({id:session.id})
});
