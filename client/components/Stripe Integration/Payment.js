import React, {Component} from 'react'
import {connect} from 'react-redux';
import Stripe from 'stripe';
//move api key to env file 
const Payment = () =>{
  var stripe = new Stripe("insert stripe key");
  const onSubmit = () => {
    fetch("/payment", {
      headers: {'Content-Type': 'application/json'},
      method: "POST",
      body: JSON.stringify({
          "product": {
              "name": "iPhone 12", 
              "image": "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-12-purple-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1617130317000", 
              "amount": 100,
              "quantity": 1
          }})
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (session) {
        return stripe.redirectToCheckout({ sessionId: session.id });
      })
      .then(function (result) {
        if (result.error) {
          alert(result.error.message);
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
      })
  };
return (
    <>
    <h1>Buy Products</h1>
    <div className="product">
      <img
        src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-12-purple-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1617130317000"
        alt="iphone 12"
        className="product_img" />
      <div className="description">
        <h3>iPhone 12</h3>
        <h4>&#8377 100.00</h4>
      </div>
      <button type="button" id="btn" onClick = {onSubmit}>BUY</button>
    </div>
    </>
)}

const mapStateToProps = (state) =>{
  return state
}

export default connect(mapStateToProps)(Payment)