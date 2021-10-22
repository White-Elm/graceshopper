import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect, Link} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import {me} from './store'
import { fetchProducts } from './store/products';
import Products from './components/Products';
import { fetchCart } from './store/cart';
import Cart from './components/Cart';
import SingleProduct from './components/SingleProduct';
import {loadProducts, _loadProducts} from './store/index';
import SuccessfulOrder from './components/Stripe Integration/Success';
import Payment from './components/Stripe Integration/Payment';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    // this.props._loadProducts()
    this.props.loadProducts();
    this.props.loadCart();
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
            // ^ this is causing the double login page, do we want to remove this and leave the login on the home page?
            <Route path="/signup" component={Signup} />
            // ^ this is alternatively causing the double signup page
            <Route exact path='/products' component={Products}/>
            <Route exact path='/products/:id' component={SingleProduct}/>
            <Route exact path='/success' component={SuccessfulOrder}/>
            <Route exact path='/checkout' component={Payment}/>


          </Switch>
        </div>
        <div>
          {isLoggedIn ? (
            <Switch>
              <Route path="/home" component={Home} />
              <Redirect to="/home" />
            </Switch>
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
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))