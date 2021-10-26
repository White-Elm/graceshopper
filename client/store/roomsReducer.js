import axios from 'axios'


const LOAD_ROOMS = 'LOAD_ROOMS';


const roomsReducers = (state = [], action) =>{
  if(action.type === LOAD_ROOMS){
      state = action.rooms;
  }
  return state;
}


const loadRooms = () =>{
    return async (dispatch) =>{
        const rooms = (await axios.get('/api/products/rooms')).data
        dispatch(_loadRooms(rooms))
    }
}

const _loadRooms = (rooms) =>{
    return {
        type: LOAD_ROOMS,
        rooms,
    }
}



export default roomsReducers;
export {loadRooms}