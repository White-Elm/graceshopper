import axios from 'axios'

const LOAD_PRODUCTS = 'LOAD_PRODUCTS';

const productReducers = (state = [], action) =>{
    if(action.type === LOAD_PRODUCTS){
        state = action.students;
    }
    return state;
}

const _loadProducts = (products) =>{
    return {
        type: LOAD_PRODUCTS,
        products,
    }

}

const loadProducts = () =>{
    return async (dispatch) =>{
        const products = (await axios.get('/api/products')).data
        dispatch(_loadProducts(products))
    }
}

export {loadProducts}