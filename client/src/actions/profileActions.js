import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_PROFILE, GET_ERRORS } from '../actions/types';

export const getProfile = (userId, token) => dispatch => {
  axios.get(`/profile/${userId}`, { headers: { Authorization: `Bearer ${token}` }})
    .then(res => {
      console.log(res.data)
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err);
    });
}

export const postAvatar = (avatar, token) => dispatch => {
  axios.post("/profile/photo", avatar, { headers: { Authorization: `Bearer ${token}` }})
    .then(res => {
      toast.success("Successfully Sent a Photo!" , {
        position: "top-right",
        autoClose: 2000
      }); 
    })
    .catch(err => {
      console.log(err);
    });
}

export const createProfile = (userId, description, token) => dispatch => {
  axios.post(`/profile/${userId}`, description, { headers: { Authorization: `Bearer ${token}` }})
    .then(res => {
      toast.success("Created!" , {
        position: "top-right",
        autoClose: 2000
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}

export const updateProfile = (userId, description, token) => dispatch => {
  axios.put(`/profile/update/${userId}`, description, { headers: { Authorization: `Bearer ${token}` }})
    .then(res => {
      toast.success("Updated!" , {
        position: "top-right",
        autoClose: 2000
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}