import axios from 'axios'


const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
// const ADD_TO_CART = 'ADD_TO_CART';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';


const productReducers = (state = [], action) =>{
  if(action.type === LOAD_PRODUCTS){
      state = action.products;
  }
//   if(action.type === ADD_TO_CART){
//       state = [...state, action.product]
//   }
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

// let previousCart;
// const addToCart = (cart, history) =>{ // debug: I changed the first variable to 'cart' (which is basically all variables combined) bc now I'm passing add'l product variables
//     return async (dispatch) =>{
//         previousCart = (await axios.get('/api/cart')).data.filter(custCart => custCart.customerId === cart.customerId && custCart.productId === cart.productId);

//         if (previousCart.length) {
//             cart.productQty = cart.productQty*1 + previousCart[0].productQty*1;
//             cart.cartTotal = cart.productQty * cart.productTotal;

//             const product = (await axios.put(`/api/cart/${previousCart[0].id}`, cart)).data;
//             dispatch(_addToCart(product))
//             history.push('/cart')
//         } else {
//             const product = (await axios.post('/api/cart', cart )).data; // debug: I changed this to post - I think bc 'cart' in our DB is actually a cartItem, we'll be including add'l cartItems with the updateQty functionality
//             dispatch(_addToCart(product))
//             history.push('/cart')
//         }
//     }
// }

// const _addToCart = (product) =>{
//     return {
//         type: ADD_TO_CART,
//         product
//     }
// }

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