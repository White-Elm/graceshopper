import axios from 'axios';

const LOAD_ADMINS = 'LOAD_ADMINS';

// actions
const _loadAdmins = (customers) => { 
    return {
        type: LOAD_ADMINS,
        customers,
    };
};


// thunk
export const fetchAdmin = () => {
    return async (dispatch) => {
        const { data: admin } = await axios.get('/api/admins');
        dispatch(_loadAdmins(admin));
    };
};

const adminReducers = (state = [], action) =>{
    if(action.type === LOAD_ADMINS){
      state = action.admin;
    }
    return state;
  }

export default adminReducers;
