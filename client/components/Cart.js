import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { destroyCartItem} from '../store/cart';


const Cart = ({ isLoggedIn, userId, cart, customers, destroy }) => {
    const customer = customers.filter( user => user.userId === userId );
    const customerId = isLoggedIn && customer.length ? customer[0].id : null;
    const hasCart = cart.filter(item => item.customerId === customerId);

    return (
        <div>
            { isLoggedIn? hasCart.length? (
                <ul>
                    {hasCart.map((cartItem) => {
                        return (
                            <li key={cartItem.id}>
                                <h2>
                                    Product Name: { cartItem.productName }
                                </h2>
                                <h2>
                                    Quantity in Cart: { cartItem.productQty }
                                </h2>
                                <h2>
                                    Unit Price: { cartItem.productTotal }
                                </h2>
                                <h2>
                                    Total Price: { (cartItem.cartTotal*1).toFixed(2) }
                                </h2>
                                <h2>
                                <button onClick={() => destroy(cartItem.id)}>Remove from cart</button>
                                </h2>
                            </li>
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
        </div>
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