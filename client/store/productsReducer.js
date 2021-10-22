import axios from 'axios'


const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
const ADD_TO_CART = 'ADD_TO_CART';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

const productReducers = (state = [], action) =>{
  if(action.type === LOAD_PRODUCTS){
    state = action.products;
  }
  if(action.type === ADD_TO_CART){
      //not sure here...
      state = [...state, action.product]
  }
  if(action.type === UPDATE_PRODUCT){
      state = state.map(product => product.id !== action.product.id ? product : action.product)
  }
  return state;
}

const loadProducts = () =>{
    return async (dispatch) =>{
        const products = (await axios.get('/api/products')).data
        dispatch(_loadProducts(products))
    }
}

const _loadProducts = (products) =>{
    return {
        type: LOAD_PRODUCTS,
        products,
    }
}
//include userID
const addToCart = (productName, productQty, history) =>{
    return async (dispatch) =>{
        const product = (await axios.put('/api/cart', {productName, productQty})).data
        dispatch(_addToCart(product))
        history.push('/cart')
    }
}

const _addToCart = (product) =>{
    return {
        type: ADD_TO_CART,
        product
    }
}

const updateProduct = (id, productName, productDescription, productQuantity, productCost, history) =>{
    return async (dispatch) =>{
        const product = (await axios.put(`/api/product/${id}`, {productName, productDescription, productQuantity, productCost})).data
        dispatch(__updateProduct(product))
        history.push(`/product/${id}`)
    }
}

const __updateProduct = (product) =>{
    return {
        type: UPDATE_PRODUCT,
        product
    }
}


export {loadProducts, addToCart, updateProduct}