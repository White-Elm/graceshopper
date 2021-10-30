import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { destroyCartItem} from '../store/cart';
import Checkout from './Checkout';
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";


const Cart = ({ isLoggedIn, userId, cart, customers, destroy, products }) => {
    const customer = customers.filter( user => user.userId === userId );
    const customerId = isLoggedIn && customer.length ? customer[0].id : null;
    const hasCart = cart.filter(item => item.customerId === customerId);
    

    return (
        <div>
            { isLoggedIn? hasCart.length? (
                <div className="cart">
                    <ul>
                        {hasCart.map((cartItem) => {
                            return (
                                <li className="cartProduct-li" key={cartItem.id}>
                                    <img className="cartImage" src={products.find( i => i.id === cartItem.productId)? products.find( i => i.id === cartItem.productId).imageUrl : ''}/>
                                    <div className="cartProduct">
                                        <div className="cartPName"> { cartItem.productName } </div>
                                        <div className="SKU"> #00-{Math.round(Math.random()*1000)+100000} </div>
                                        <div className="cartQUT">
                                            <div>
                                                <div> Item Price</div>
                                                <div> ${ cartItem.productTotal } </div>
                                            </div>
                                            <div>
                                                <div> Quantity </div>
                                                <div> { cartItem.productQty } </div>
                                            </div>
                                            <div>
                                                <div> Item Total </div>
                                                <div> ${ (cartItem.cartTotal*1).toFixed(2) } </div>
                                            </div>
                                        </div>
                                            <div>
                                                <button onClick={() => destroy(cartItem.id)}>Remove from cart</button>
                                            </div>
                                    </div>
                                </li>
                                
                            )
                        })}
                        {/* <Link className="cartCheckout" to='/checkout'> CHECKOUT </Link> */}
                    </ul>
           <Checkout/>
                </div>
                
            ) : (
                <div>
                    No products in your cart. 
                    <Link to='/products'> Keep shopping </Link>
                </div>
            ) : (
                <ul>
                    <div>
                        <Link to='/login'> Log in </Link> or <Link to='/signup'> Sign up </Link> to continue.
                    </div>
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
        customers: state.customers,
        products:state.products
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);