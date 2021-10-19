import axios from 'axios';

const LOAD_CART = 'LOAD_CART';

// actions
const _loadCart = (cart) => { 
    return {
        type: LOAD_CART,
        cart,
    };
};

// thunk
export const fetchCart = () => {
    return async (dispatch) => {
        const { data: cart } = await axios.get('/api/cart');
        dispatch(_loadCart(cart));
    };
};

// reducer
export default (state = [], action) => {
    switch (action.type) {
        case LOAD_CART:
            return action.cart;
        default: 
            return state;
    }
};