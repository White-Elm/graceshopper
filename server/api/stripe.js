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

const router = require('express').Router()
const stripe = require("stripe")("ask Amata for this");
const uuid = require("uuid");
module.exports = router

router.post("/", async (req, res) => {
  console.log("Request:", req.body);
  let error;
  let status;
  try {
    const { cart, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotency_key = uuid();
    const charge = await stripe.charges.create(
      {
        amount: cart.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased from White Elm`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotency_key
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }
  res.json({ error, status });
});