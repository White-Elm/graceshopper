import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { destroyCartItem} from '../store/cart';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme,  ThemeProvider} from '@mui/material';

const Cart = ({ isLoggedIn, userId, cart, customers, destroy }) => {
    const newCart = setTimeout(() => { return cart }, 50)
    const customer = customers.filter( user => user.userId === userId );
    const customerId = isLoggedIn && customer.length ? customer[0].id : null;
    const hasCart = cart.filter(item => item.customerId === customerId);
    const theme = createTheme();


    return (
        <ThemeProvider theme={theme}>
            { isLoggedIn? hasCart.length? (
                <ul>
                    {hasCart.map((cartItem) => {
                        return (
                            <Grid item key={cartItem.id} xs={12} sm={6} md={4} align="center">
                            <MenuItem key={cartItem.id}>
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
                                    Total Price: { (cartItem.cartTotal*1).toFixed(2) }
                                </Typography>
                                <Typography variant="h5" align="center" color="text.secondary">
                                <Button variant="contained" onClick={() => destroy(cartItem.id)}>Remove from cart</Button>
                                </Typography>
                            </MenuItem>
                        </Grid>
                        )
                    })}
                    <Link to='/checkout'> checkout </Link>
                </ul>
                
            ) : (
                <h2>
                    No products in your cart. 
                    <Link to='/products'> Keep shopping </Link>
                </h2>
            ) : (
                <ul>
                    <h2>
                        Login or Sign up to continue.
                        <Link to='/login'> Log in </Link>
                        <Link to='/signup'> Sign up </Link>
                    </h2>
                </ul>
            )}
            {/* <Link to='/checkout'> checkout </Link> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);