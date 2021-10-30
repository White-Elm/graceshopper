import React from 'react'
import {connect} from 'react-redux'


export const Checkout = ({ isLoggedIn, userId, cart, customers }) => {
  const customer = customers.filter( user => user.userId === userId );
  const customerId = isLoggedIn && customer.length ? customer[0].id : null;
  const hasCart = cart.filter(item => item.customerId === customerId);

  const cartTotal = hasCart.length ? hasCart.reduce((sum, cartItem) => sum + cartItem.cartTotal*1, 0) : 0;
  const taxes = cartTotal * 0.08;
  const shipping = cartTotal * 0.01;

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