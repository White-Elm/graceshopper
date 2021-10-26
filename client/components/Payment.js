import React from "react";
import StripeCheckout from "react-stripe-checkout";
import {connect} from 'react-redux';
import axios from "axios";
import { addInvoice, deleteCart } from "../store";

//move api key to env file 
const Payment = props => {
  const { cart, handleSubmit } = props;

  let cartTotal =0;
  cart.map((product) => {
    let productTotal = parseInt(product.productTotal)  
    cartTotal += productTotal;
    });
    
   async function handleToken(token, addresses) {
    const response = await axios.post(
      "http://localhost:8080/api/stripe",
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
            <StripeCheckout onSubmit = {handleSubmit}
        stripeKey="remove skey"
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

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      dispatch(addInvoice);
      dispatch(deleteCart);
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(Payment)
