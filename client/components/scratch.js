import {React, Component} from "react";
import StripeCheckout from "react-stripe-checkout";
import {connect} from 'react-redux';
import axios from "axios";
import { addInvoice, deleteCart } from "../store";


class TestingPayment extends Component{
    constructor(props){
        super(props);
        const {cart} = this.props;
        console.log('props cart',cart)
        this.state = {
            cart: cart,
        }
    }
    render(){
  const stripePK = process.env.REACT_APP_STRIPE_PK;

console.log(cart)
  const cartTotal = cart.length ? cart.reduce((sum, cartItem) => sum + cartItem.cartTotal*1, cart[0].cartTotal*1) : 0;
      
   async function handleToken(token, addresses) {
    const response = await axios.post(
      process.env.REACT_APP_STRIPE_RESPONSE,
      { token, cart }
    );

    var event = new CustomEvent("event", { "detail": "waiting for stripe response" });
    document.dispatchEvent(event);
  }

  document.addEventListener("event", function(){
    console.log('hello from the othersiiiiide')
    this.props.destroy(cart.id,cart.productName,cart.productQty,cart.productTotal,cart.invoiceTotal,cart.createdAt , cart.updatedAt ,cart.productId,cart.customerId)
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
            }
};

const mapStateToProps = ({ cart }) => ({ cart });

const mapDispatchToProps = (dispatch, {history}) => {
  return{
    destroy: (id,productName,productQty,productTotal,invoiceTotal,createdAt , updatedAt ,productId,customerId) => {
      //dispatch(addInvoice(id,productName,productQty,productTotal,invoiceTotal,createdAt , updatedAt ,productId,customerId,history));
      dispatch(deleteCart(id,productName,productQty,productTotal,invoiceTotal,createdAt , updatedAt ,productId,customerId));
    }
};
}

export default connect(mapStateToProps, mapDispatchToProps)(TestingPayment) 
