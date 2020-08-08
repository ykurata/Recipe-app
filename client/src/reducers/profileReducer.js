import { GET_PROFILE } from '../actions/types';

const initialState = {
  profile: "",
  username: "",
  avatar: ""
}

export default function(state = initialState, action){
  switch(action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        username: action.payload.userId.name,
        avatar: action.payload.photo
      }
    default: 
      return state;
  }
}