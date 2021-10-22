import axios from 'axios';

const LOAD_CUSTOMERS = 'LOAD_CUSTOMERS';

// actions
const _loadCustomers = (customers) => { 
    return {
        type: LOAD_CUSTOMERS,
        customers,
    };
};

// thunk
export const fetchCustomer = () => {
    return async (dispatch) => {
        const { data: customer } = await axios.get('/api/customers');
        dispatch(_loadCustomers(customer));
    };
};

// reducer
export default (state = [], action) => {
    switch (action.type) {
        case LOAD_CUSTOMERS:
            return action.customers;
        default: 
            return state;
    }
};