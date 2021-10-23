import axios from 'axios';

const LOAD_INVOICE = 'LOAD_INVOICE';

// actions
const _loadInvoice = (cart) => { 
    return {
        type: LOAD_INVOICE,
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

// reducer
export default (state = [], action) => {
    switch (action.type) {
        case LOAD_INVOICE:
            return action.invoice;
        default: 
            return state;
    }
};