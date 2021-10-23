import React from 'react';
import {connect} from 'react-redux';

const SuccessfulOrder = () =>{
  return(
  <div>
  <body className = "container">
  <h1>Transaction Successful</h1>
      <div className = "product"> ## add the product stuff from database here
        <h3>Your order is on its way!</h3>
  </div>
  </body>
    </div>
)}

const mapStateToProps = (state) =>{
  return state
}

export default connect(mapStateToProps)(SuccessfulOrder)
