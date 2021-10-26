import axios from 'axios';

const LOAD_INVOICE = 'LOAD_INVOICE';
const ADD_INVOICE = 'ADD_INVOICE';
const SET_FINAL_CART = 'SET_FINAL_CART'
const DELETE_CART = 'DELETE_CART'


const invoiceReducers = (state = [], action) =>{
    if(action.type === LOAD_INVOICE){
      state = action.invoice;
    }
    if(action.type === SET_FINAL_CART){
        state = action.cart;

    }
    if(action.type === ADD_INVOICE){
        state = [...state, action.invoice]
    }
    return state;
  }

// actions
const _loadInvoice = () => { 
    return {
        type: LOAD_INVOICE,
        cart,
    };
};

const _setFinalCart = () => { 
    return {
        type: SET_FINAL_CART,
        cart,
    };
};

// thunk
export const fetchInvoice = () => {
    return async (dispatch) => {
        const invoice = await axios.get('/api/invoice');
        dispatch(_loadInvoice(invoice));
    };
};

export const finalCart = () =>{
    return async(dispatch) => {
        const finalCart = await axios.get('/api/cart/customerId/:id');
        dispatch(_setFinalCart(finalCart.data));
    }
}

export const addInvoice = (cart) => {
    return async (dispatch) => {
        const invoice = await axios.post('/api/invoice');
        window.localStorage.setItem(invoice)
        dispatch(finalCart());
    };
};


export default invoiceReducers;
