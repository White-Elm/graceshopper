import axios from 'axios'


const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
// const ADD_TO_CART = 'ADD_TO_CART';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

const productReducers = (state = [], action) =>{
  if(action.type === LOAD_PRODUCTS){
      state = action.products;
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

const updateProduct = (id, productName, productDescription, productQuantity, productCost, history) =>{
    return async (dispatch) =>{
        const product = (await axios.put(`/api/products/${id}`, {productName, productDescription, productQuantity, productCost})).data
        dispatch(__updateProduct(product))
        history.push(`/products/${id}`)
    }
}

const __updateProduct = (product) =>{
    return {
        type: UPDATE_PRODUCT,
        product
    }
}

export default productReducers;
export {loadProducts, updateProduct}