import { GET_PROFILE, GET_LOGIN_USER_PROFILE } from '../actions/types';

const initialState = {
  loginUserProfle: "",
  profile: ""
}

export default function(state = initialState, action){
  switch(action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload
      }
    case GET_LOGIN_USER_PROFILE: 
      return {
        ...state,
        loginUserProfle: action.payload
      }  
    default: 
      return state;
  }
}