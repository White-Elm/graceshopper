import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import products from './products';
import cart from './cart';
import customers from './customers';
import invoices from './invoices';
import productReducers from './productsReducer';
import roomsReducers from './roomsReducer';
import typesReducers from './typesReducer';

const reducer = combineReducers({ 
  auth,
  products,
  cart,
  customers,
  invoices,
  productReducers,
  rooms: roomsReducers,
  types : typesReducers,
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
export * from './products'
export * from './cart'
export * from './customers'
export * from './invoices'