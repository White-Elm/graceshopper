import React from 'react'
import {connect} from 'react-redux'


export const Checkout = props => {
  return (
    <div>
      <h3>
          {/* placeholder: your code goes here */}
          Anything you need
      </h3>
    </div>
  )
}

const mapState = state => {
  return {
    state
  }
}

export default connect(mapState)(Checkout)