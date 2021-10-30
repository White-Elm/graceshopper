import React from 'react'
import {connect} from 'react-redux'
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

export const Checkout = ({ isLoggedIn, userId, cart, customers }) => {
  const customer = customers.filter( user => user.userId === userId );
  const customerId = isLoggedIn && customer.length ? customer[0].id : null;
  const hasCart = cart.filter(item => item.customerId === customerId);

  const cartTotal = hasCart.length ? hasCart.reduce((sum, cartItem) => sum + cartItem.cartTotal*1, 0) : 0;
  const taxes = cartTotal * 0.08;
  const shipping = cartTotal * 0.01;
  
  //stripe info
  const stripePK = "pk_test_51JmJ4mL6DhgOcd4FpwvMC0QlXY5caejP5TNVALS0igSHGcviANpebdiDi67fKA36SlvEoo02mPUz8edcku85D1Zr00Pgn5TTpL";
  const stripeTotal = cartTotal + taxes + shipping;
  async function handleToken(token, addresses) {
    const response = await axios.post(
      "http://localhost:8080/",
      { token, cart }
    );
    var event = new CustomEvent("event", { "detail": "waiting for stripe response" });
      document.dispatchEvent(event);
  }
  document.addEventListener("event", function(){
    alert('Thanks for shopping at White Elm!')
    window.location.href ="http://localhost:8080/"
  })
  
  return (
    <div className="checkout">
      <div className="checkoutDetails">
          { hasCart.length? (
            <ul>
              <li>
                Subtotal: ${ cartTotal.toFixed(2) }
              </li>
              <li>
                Shipping & Processing: ${ shipping.toFixed(2) }
              </li>
              <li>
                Tax: ${ taxes.toFixed(2) }
              </li>
              <li>
                Total: ${ (cartTotal + taxes + shipping).toFixed(2) }
              </li>
              < StripeCheckout 
        stripeKey= {stripePK}
        amount={stripeTotal * 100}
        name= "Checkout"
        token={handleToken}
        billingAddress
        shippingAddress
      />
              {/* placeholder: Payment component goes here */}
            </ul>
          ) : (
            <li>
              There's nothing in your cart. Keep shopping:
            </li>
          )}
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
    cart: state.cart,
    customers: state.customers
  }
}

export default connect(mapState)(Checkout)