import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import axios from 'axios'


const LOAD_PRODUCTS = 'LOAD_PRODUCTS';

const productReducers = (state = [], action) =>{
  if(action.type === LOAD_PRODUCTS){
    state = action.products;
  }
  return state;
}

const reducer = combineReducers({ 
  auth, 
  products: productReducers, 
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)


const loadProducts = () =>{
    return async (dispatch) =>{
        const products = (await axios.get('/api/products')).data
        //const products = [{name: 'cup', id: 1}, {name: 'bowl', id: 2 }, {name: 'spoon', id: 3 }]
        dispatch(_loadProducts(products))
    }
}

const _loadProducts = (products) =>{
    return {
        type: LOAD_PRODUCTS,
        products,
    }
}



export default store
export * from './auth'
export {loadProducts}