import axios from 'axios';
import jwt_decode from "jwt-decode";

import { 
  GET_ERRORS 
} from './types';

export const loginUser = userData => dispatch => {
  axios.post('/users/login', userData)  
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      const decoded = jwt_decode(token);
      localStorage.setItem("userId", decoded.id);
      window.location = "/";
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}