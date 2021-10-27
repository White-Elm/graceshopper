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
        const { data: invoice } = await axios.get('/api/invoice');
        dispatch(_loadInvoice(invoice));
    };
};

export const addInvoice = (id,productName,productQty,productTotal,invoiceTotal,createdAt , updatedAt ,productId,customerId,history) => {
    return async (dispatch) => {
        const invoice = await axios.post(`/api/invoices/${customerId}`,{ id,productName,productQty,productTotal,invoiceTotal,createdAt , updatedAt ,productId,customerId}).data;
        dispatch(_addInvoice(invoice));
        history.push(`/invoices/${customerId}`)
    };
};

export const deleteCart = (customerId) => {
    return async (dispatch) => {
        await axios.delete(`/api/cart/${customerId}`);
        dispatch(_deleteCart({ customerId: customerId * 1 }));
    };
};

export default invoiceReducers;
