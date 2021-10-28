import React from "react";
import StripeCheckout from "react-stripe-checkout";
import {connect} from 'react-redux';
import axios from "axios";
import { addInvoice, deleteCart } from "../store";

const Payment = ( { cart, destroy}) => {
  const stripePK = process.env.REACT_APP_STRIPE_PK;

  const cartTotal = cart.length ? cart.reduce((sum, cartItem) => sum + cartItem.cartTotal*1, cart[0].cartTotal*1) : 0;

   async function handleToken(token, addresses) {
    const response = await axios.post(
      process.env.REACT_APP_STRIPE_RESPONSE,
      { token, cart }
    );
    if (cart.length >= 1){
      console.log(cart)
      var event = new CustomEvent("event", { "detail": "waiting for stripe response" });
      document.dispatchEvent(event);
    }
  }
  document.addEventListener("event", function(){
    const invoice = {
            productName: cart[0].productName,
            productQty: cart[0].productQty,
            productTotal: cart[0].productTotal,
            invoiceTotal: cart[0].productQty*cart.cartTotal,
            customerId: cart[0].customerId,
            productId: cart[0].productId,
            userId: cart[0].userId,
    }

    console.log('this is the invoice', invoice);
    console.log('this is the invoice', cart);

    destroy(invoice)
  })

    return (
        <div>
            <ul>
                {cart.map((product) => {
                    return (
                        <li key={product.id}>
                            <h2>
                                { product.productName }
                                ({ product.productQty })
                                { product.productTotal }
                            </h2>
                        </li>
                    )
                })}
            </ul>
            <h3> Cart Total: {cartTotal} </h3>
            < StripeCheckout 
        stripeKey= {stripePK}
        amount={cartTotal * 100}
        name= "Checkout"
        token={handleToken}
        billingAddress
        shippingAddress
      />
        </div>
    )
};

const mapStateToProps = ({ cart }) => ({ cart });

const mapDispatchToProps = (dispatch, {history}) => {
  return{
    destroy: (invoice) => {
      dispatch(addInvoice(invoice, history));
      dispatch(deleteCart(invoice.userId));
    }
};
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment) 

//helllooo this is a test 