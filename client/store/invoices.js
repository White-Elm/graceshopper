import axios from 'axios';

const LOAD_INVOICE = 'LOAD_INVOICE';
const ADD_INVOICE = 'ADD_INVOICE';
const DELETE_CART = 'DELETE_CART'


const invoiceReducers = (state = [], action) =>{
    if(action.type === LOAD_INVOICE){
      state = action.invoice;
    }
    if(action.type === ADD_INVOICE){
        state = [...state, action.invoice]
    }
    if(action.type === DELETE_CART){
        return state.filter(cart => cart.customerId !== action.cart.customerId);
    }
    return state;
  }

// actions
const _loadInvoice = (invoice) => { 
    return {
        type: LOAD_INVOICE,
        invoice,
    };
};

const _deleteCart = (cart) => { 
    return {
        type: DELETE_CART,
        cart,
    };
};

const _addInvoice = (cart) => { 
    return {
        type: ADD_INVOICE,
        cart,
    };
};


// thunk
export const fetchInvoice = () => {
    return async (dispatch) => {
        const { data: invoice } = await axios.get('/api/invoices');
        dispatch(_loadInvoice(invoice));
    };
};

export const addInvoice = (invoice1) => {
    return async (dispatch) => {
        const invoice = await axios.post(`/api/invoices`,{ invoice:invoice1 }).data;
        dispatch(_addInvoice(invoice));
    };
};

export const deleteCart = (userId) => {
    return async (dispatch) => {
        await axios.delete(`/api/cart/${userId}`);
        dispatch(_deleteCart({ userId: userId * 1 }));
    };
};

export default invoiceReducers;
