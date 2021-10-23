import React from 'react';
import {connect} from 'react-redux';

const FailedOrder = () =>{
  return(
  <div>
  <body className = "container">
  <h1>Transaction Unsuccessful :(</h1>
      <div className = "product"> 
        <h3>Error with your order, sorry about that.</h3>
  </div>
  </body>
    </div>
)}

const mapStateToProps = (state) =>{
  return state
}

export default connect(mapStateToProps)(SuccessfulOrder)