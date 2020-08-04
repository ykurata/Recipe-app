import axios from 'axios';
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { 
  GET_ERRORS,
  SET_CURRENT_USER,
} from './types';


// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const registerUser = userData => dispatch => {
  axios.post('/users/register', userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      const decoded = jwt_decode(token);
      localStorage.setItem("userId", decoded.id);
      // Set token to Auth header
      setAuthToken(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}

export const loginUser = userData => dispatch => {
  axios.post('/users/login', userData)  
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      const decoded = jwt_decode(token);
      localStorage.setItem("userId", decoded.id);
      // Set token to Auth header
      setAuthToken(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}

// Log user out
export const logoutUser = () => dispatch => {
  localStorage.clear();
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  window.location.href = "/";
};
