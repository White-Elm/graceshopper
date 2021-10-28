import axios from 'axios';

const LOAD_CART = 'LOAD_CART';
const DESTROY_CART_ITEM = 'DESTROY_CART_ITEM';
const ADD_TO_CART = 'ADD_TO_CART';


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

const _addToCart = (product) =>{
    return {
        type: ADD_TO_CART,
        product
    }
}

// thunk
export const fetchCart = () => {
    return async (dispatch) => {
        const { data: cart } = await axios.get('/api/cart');
        dispatch(_loadCart(cart));
    };
};

export const destroyCartItem = (id) => {
    return async (dispatch) => {
        await axios.delete(`/api/cart/${id}`);
        dispatch(_destroyCartItem({ id: id * 1 }));
    };
};

let previousCart;
export const addToCart = (cart, history) =>{ // debug: I changed the first variable to 'cart' (which is basically all variables combined) bc now I'm passing add'l product variables
    return async (dispatch) =>{
        previousCart = (await axios.get('/api/cart')).data.filter(custCart => custCart.customerId === cart.customerId && custCart.productId === cart.productId);

        if (previousCart.length) {
            cart.productQty = cart.productQty*1 + previousCart[0].productQty*1;
            cart.cartTotal = cart.productQty * cart.productTotal;
            const product = (await axios.put(`/api/cart/${previousCart[0].id}`, cart)).data;
            dispatch(_addToCart(product))
            history.push('/cart')
        } else {
            const product = (await axios.post('/api/cart', cart )).data; // debug: I changed this to post - I think bc 'cart' in our DB is actually a cartItem, we'll be including add'l cartItems with the updateQty functionality
            dispatch(_addToCart(product))
            history.push('/cart')
        }
    }
}

// reducer
export default (state = [], action) => {
    switch (action.type) {
        case LOAD_CART:
            return action.cart;
        case DESTROY_CART_ITEM:
            return state.filter(cart => cart.id !== action.cart.id);
        case ADD_TO_CART:
            if (previousCart.length) { return state.map((product) => product.id === action.product.id ? action.product : product )}
            else { return [...state, action.product] }
        default: 
            return state;
    }
};