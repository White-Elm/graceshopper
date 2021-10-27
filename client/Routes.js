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
import {loadProducts, _loadProducts} from './store/productsReducer';
import Payment from './components/Payment';
import {loadRooms} from './store/roomsReducer';
import {loadTypes} from './store/typesReducer';
import SingleCustomer from './components/SingleCustomer';
import AdminHome from './components/Admin/AdminHome';
import AdminProducts from './components/Admin/AdminProducts';
import AdminSingleProduct from './components/Admin/AdminSingleProduct';
import AdminCustomers from './components/Admin/AdminCustomers'
import AddCustomerInfo from './components/AddCustomerInfo'
import { fetchAdmin } from './store/admins';
import TestingPayment from './components/scratch';



/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    this.props.loadProducts();
    this.props.loadCart();
    this.props.loadCustomer();
    this.props.loadAdmin();
    this.props._loadRooms();
    this.props._loadTypes();
  }

  render() {
    const {isLoggedIn} = this.props
    //I added a loadAdmins prop, so we can check if the person's userId matches the one from the admins table 
    //to display a different navbar

    return (
      <div>
        <div>
          <Switch>
            <Route exact path='/cart' component={ Cart } />
            <Route exact path='/' component={ Login } />
            <Route exact path='/products' component={Products}/>
            <Route exact path='/products/:id' component={SingleProduct}/>
            <Route exact path='/products/Sort/:by?' component={Products} />
            <Route path='/checkout' component={Checkout}/>
            <Route exact path='/Admin' component={AdminHome}/>
            <Route exact path='/admin/products' component={AdminProducts}/>
            <Route exact path='/admin/products/:id' component={AdminSingleProduct}/>
            <Route exact path='/Admin/Customers' component={AdminCustomers}/>
            <Route exact path='/Admin/customers/:id' component={SingleCustomer}/>
            <Route exact path='/products' component={Products}/>
            <Route path='/products/:id' component={SingleProduct}/>
            <Route exact path='/payment' component={Payment}/>
            <Route exact path='/customers/:id' component={SingleCustomer}/>
            <Route exact path='/customerprofile' component={AddCustomerInfo}/>

          </Switch>
        </div>
        <div>
          {isLoggedIn ? (
            <Fragment>
              <Route path="/home" exact component={Home} />
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
    loadProducts: () => dispatch(fetchProducts()),
  //check both load products  
    loadProducts: () => dispatch(fetchProducts()),

    _loadProducts : async () =>{
      dispatch(loadProducts())
    },
    _loadRooms : async () =>{
      dispatch(loadRooms())
    },
    _loadTypes : async () =>{
      dispatch(loadTypes())
    },

    loadCustomer: () => dispatch(fetchCustomer()),

    loadAdmin: () => dispatch(fetchAdmin()),
    loadCart: () => dispatch(fetchCart()),



  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))