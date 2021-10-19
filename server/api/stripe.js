// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('sk_test_51JmJ4mL6DhgOcd4FAASlFTjJ8k3cyQXDXAPctTfzb3foozn3HQCLNiJT64lVOAyfIPNhMh6ML3opXvmb4kF5awCx00A5q7DhEo');

const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [{
    name: 'Stainless Steel Water Bottle',
    amount: 1000,
    currency: 'usd',
    quantity: 1,
  }],
  payment_intent_data: {
    application_fee_amount: 123,
  },
  mode: 'payment',
  success_url: 'https://example.com/success',
  cancel_url: 'https://example.com/cancel',
}, {
  stripeAccount: '{{CONNECTED_STRIPE_ACCOUNT_ID}}',
});

// 303 redirect to session.url