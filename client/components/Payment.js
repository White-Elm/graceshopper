import React from "react";
import StripeCheckout from "react-stripe-checkout";
import {connect} from 'react-redux';
import axios from "axios";
import { addInvoice, deleteCart } from "../store";


const mapStateToProps = ({ cart }) => ({ cart });
const mapDispatchToProps = (dispatch) => {
  return{
    destroy: (cart) => {
      dispatch(addInvoice())
      dispatch(deleteCart(cart));
    }
  };
};

const Payment = ( { cart }) => {
  
  const stripePK = process.env.REACT_APP_STRIPE_PK;
  console.log(stripePK);

  let cartTotal =0;
  cart.map((product) => {
    let productTotal = parseInt(product.productTotal)  
    cartTotal += productTotal;
    });
      
   async function handleToken(token, addresses) {
    const response = await axios.post(
      process.env.REACT_APP_STRIPE_RESPONSE,
      { token, cart }
    );
  }

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

export default connect(mapStateToProps, mapDispatchToProps)(Payment)


