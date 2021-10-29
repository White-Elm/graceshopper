import React from "react";
import StripeCheckout from "react-stripe-checkout";
import {connect} from 'react-redux';
import axios from "axios";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme,  ThemeProvider} from '@mui/material';
import { destroyCartItem} from '../store/cart';


const Payment = ( { cart, destroy }) => {
  const stripePK = process.env.REACT_APP_STRIPE_PK;

  const cartTotal = cart.length ? cart.reduce((sum, cartItem) => sum + cartItem.cartTotal*1, cart[0].cartTotal*1) : 0;
  const theme = createTheme();

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
      <ThemeProvider theme={theme}>
            {cart.map((cartItem) => {
                        return (
                          <Grid item key={cartItem.id} xs={12} sm={6} md={4} align="center">
                                <Typography variant="h5" align="center" color="text.secondary">
                                    Product Name: { cartItem.productName }
                                </Typography>
                                <Typography variant="h5" align="center" color="text.secondary">
                                    Quantity in Cart: { cartItem.productQty }
                                    </Typography>
                                <Typography variant="h5" align="center" color="text.secondary">
                                    Unit Price: { cartItem.productTotal }
                                    </Typography>
                                <Typography variant="h5" align="center" color="text.secondary">
                                <Button variant="contained" onClick={() => destroy(cartItem.id)}>Remove from cart</Button>
                                </Typography>
                        </Grid>
                        )
                    })}
             <Typography variant="h3" align="left" color="text.secondary"> Cart Total: ${cartTotal} </Typography>
            < StripeCheckout 
        stripeKey= {stripePK}
        amount={cartTotal * 100}
        name= "Checkout"
        token={handleToken}
        billingAddress
        shippingAddress
      />
        </ThemeProvider>
    )
};

const mapDispatchToProps = (dispatch) => {
  return{
      destroy: (cartItem) => {
          dispatch(destroyCartItem(cartItem));
      }
  };
};

const mapStateToProps = (state) => {
  return {
      isLoggedIn: !!state.auth.id,
      userId: state.auth.id,
      cart: state.cart,
      customers: state.customers
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment) 

//helllooo this is a test 