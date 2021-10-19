import axios from 'axios';

const LOAD_PRODUCTS = 'LOAD_PRODUCTS';

// actions
const _loadProducts = (products) => { 
    return {
        type: LOAD_PRODUCTS,
        products,
    };
};

// thunk
export const fetchProducts = () => {
    return async (dispatch) => {
        const { data: products } = await axios.get('/api/products');
        dispatch(_loadProducts(products));
    };
};

// reducer
export default (state = [], action) => {
    switch (action.type) {
        case LOAD_PRODUCTS:
            return action.products;
        default: 
            return state;
    }
};