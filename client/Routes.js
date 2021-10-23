import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import {me} from './store'

import { fetchProducts } from './store/products';
import Products from './components/Products';
import { fetchCart } from './store/cart';
import { fetchCustomer } from './store/customers';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import SingleProduct from './components/SingleProduct';
import SuccessfulOrder from './components/Stripe Integration/Success';
import {loadProducts, _loadProducts} from './store/productsReducer';
import Payment from './components/Payment';
import SingleCustomer from './components/SingleCustomer';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    // this.props._loadProducts()
    this.props.loadProducts();
    this.props.loadCart();
    this.props.loadCustomer();
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        <div>
          <Switch>
            <Route exact path='/cart' component={ Cart } />

            <Route exact path='/' component={ Login } />
            <Route path="/login" component={Login} /> 
            <Route path="/signup" component={Signup} />
            <Route exact path='/products' component={Products}/>
            <Route exact path='/products/:id' component={SingleProduct}/>
            <Route exact path='/checkout' component={Payment}/>
            <Route exact path='/products' component={Products}/>
            <Route path='/products/:id' component={SingleProduct}/>
            <Route exact path='/customers/:id' component={SingleCustomer}/>
            <Route path='/checkout' component={Checkout}/>

          </Switch>
        </div>
        <div>
          {isLoggedIn ? (
            <Fragment>
              <Route path="/home" exact component={Home} />
              <Redirect to="/home" />
            </Fragment>
          ) : (
            <Switch>
              <Route path='/' exact component={ Login } />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </Switch>
          )}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
  //check both load products  
    loadProducts: () => dispatch(fetchProducts()),
    loadCart: () => dispatch(fetchCart()),

    _loadProducts : async () =>{
      dispatch(loadProducts())
    },

    loadCustomer: () => dispatch(fetchCustomer()),

  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))