import React from 'react'
import {connect} from 'react-redux'


export const Checkout = ({ cart }) => {
  const cartTotal = cart.length ? cart.reduce((sum, cartItem) => sum + cartItem.cartTotal*1, cart[0].cartTotal*1) : 0;
  const taxes = Math.round(cartTotal * 0.08, 2);

  return (
    <div>
      <h3>
          { cart.length? (
            <ul>
              <li>
                Total $$: { cartTotal }
              </li>
              <li>
                Taxes $$: { taxes }
              </li>
              <li>
                Final Total $$: { cartTotal + taxes }
              </li>
              {/* placeholder: Payment component goes here */}
            </ul>
          ) : (
            <li>
              There's nothing in your cart. Keep shopping:
            </li>
          )}
      </h3>
    </div>
  )
}

const mapState = state => {
  return {
    cart: state.cart,
  }
}

export default connect(mapState)(Checkout)