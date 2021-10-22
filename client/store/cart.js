import axios from 'axios';

const LOAD_CART = 'LOAD_CART';
const DESTROY_CART_ITEM = 'DESTROY_CART_ITEM';

// actions
const _loadCart = (cart) => { 
    return {
        type: LOAD_CART,
        cart,
    };
};

const _destroyCartItem = (cart) => { 
    return {
        type: DESTROY_CART_ITEM,
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

export const destroyCartItem = (id) => {
    console.log(id)
    return async (dispatch) => {
        await axios.delete(`/api/cart/${id}`);
        dispatch(_destroyCartItem({ id: id * 1 }));
    };
};

// reducer
export default (state = [], action) => {
    switch (action.type) {
        case LOAD_CART:
            return action.cart;
        case DESTROY_CART_ITEM:
            return state.filter(cart => cart.id !== action.cart.id);
        default: 
            return state;
    }
};