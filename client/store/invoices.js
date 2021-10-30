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


// thunk
export const fetchInvoice = () => {
    return async (dispatch) => {
        const { data: invoice } = await axios.get('/api/invoice');
        dispatch(_loadInvoice(invoice));
    };
};

export const addInvoice = () => {
    return async (dispatch) => {
        const invoice = await axios.post('/api/invoice');
        window.localStorage.setItem(invoice)
        dispatch(finalCart());
    };
};

export const deleteCart = (customerId) => {
    console.log(id)
    return async (dispatch) => {
        await axios.delete(`/api/cart/${customerId}`);
        dispatch(_deleteCart({ id: id * 1 }));
    };
};

export default invoiceReducers;
