import axios from 'axios'

const LOAD_TYPES = 'LOAD_TYPES';

const typesReducers = (state = [], action) =>{
  if(action.type === LOAD_TYPES){
      state = action.productTypes
  }
  return state;
}


const loadTypes = () =>{
    return async (dispatch) =>{
        const productTypes = (await axios.get('/api/products/types')).data
        dispatch(_loadTypes(productTypes))
    }
}

const _loadTypes = (productTypes) =>{
    return {
        type: LOAD_TYPES,
        productTypes,
    }
}



export default typesReducers;
export {loadTypes}